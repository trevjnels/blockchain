// {
// 	"amount": 1200369,
// 	"sender": "ADFHDLKJ394",
// 	"recipient": "3JFGIJGAFN2"
// }
// {
// 	"newNodeUrl": "http://localhost:3004"
// }

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');
//this points to the command in the server start in package.json

const nodeAddress = uuid()
  .split('-')
  .join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//these app.use calls are saying that if a request comes in in json or form data
//we can now use the data in any endpoint we use it at at bleow

app.get('/blockchain', function(req, res) {
  res.send(bitcoin);
});

app.post('/transaction', function(req, res) {
  const newTransaction = req.body;
  const blockIndex = bitcoin.addTransactionsToPendingTransactions(
    newTransaction
  );
  //this line above returns the index
  res.json({
    note: `Transaction will be added in block ${blockIndex}.`
  });
});

app.post('/transaction/broadcast', function(req, res) {
  //1create new transactions

  const newTransaction = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
  bitcoin.addTransactionsToPendingTransactions(newTransaction);
  //2 broadcast trans to all nodes
  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    //goint to make requests to all transaction endpoints on our networkNode
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises).then(data => {
    res.json({ note: 'global transaction created!' });
  });
});

app.get('/mine', function(req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises)
    .then(data => {
      const requestOptions = {
        uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
        method: 'POST',
        body: {
          amount: 12.5,
          sender: '00',
          recipient: nodeAddress
        },
        json: true
      };
      return rp(requestOptions);
    })
    .then(data => {
      res.json({
        note: 'New block mined && broadcast sucessfully',
        block: newBlock
      });
    });
});

app.post('/receive-new-block', function(req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = bitcoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

  if (correctHash && correctIndex) {
    bitcoin.chain.push(newBlock);
    bitcoin.pendingTransactions = [];
    res.json({
      note: 'new block added and verified',
      newBlock: newBlock
    });
  } else {
    res.json({
      note: 'new block REJETED',
      newBlock: newBlock
    });
  }
});

app.post('/register-and-broadcast-node', function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
    bitcoin.networkNodes.push(newNodeUrl);
    //taking the new nodes URL and registering it with this current node by pushing into network nodes array
  } //this is the most complicated part of the program apperently
  //this takes the info from the new node
  const regNodesPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    //register-node
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true
    };
    //this entire forloop makes a reqeust to other nodes in this network at the/register-node endpoint
    //pushing these rquests into an array
    regNodesPromises.push(rp(requestOptions));
  });
  Promise.all(regNodesPromises)
    //running all promises in array
    .then(data => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        //this sends all of the current nodes to the new node
        method: 'POST',
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
          //this is a list of the URLS that are already present in our network
          // the ... is a spread operator that essentially flattens arrs
        },
        json: true
      };
      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({ note: 'New node registered with netwok sucessfully' });
    });
});
//
app.post('/register-node', function(req, res) {
  //this is when the helper node broadcasts the new node information to the other nodes
  const newNodeUrl = req.body.newNodeUrl;
  //error handling on the next two lines to weed out any current nodes on the array and
  //also to not push the current node.
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
  }
  res.json({ note: 'New node pushed to networkNodes' });
});

app.post('/register-nodes-bulk', function(req, res) {
  //this tells the new node what all of the other noeds are
  const allNetworkNodes = req.body.allNetworkNodes;

  allNetworkNodes.forEach(networkNodeUrl => {
    //
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    const nodeNotAlreadyPresent =
      bitcoin.networkNodes.indexOf(networkNodeUrl) === -1;
    if (nodeNotAlreadyPresent && notCurrentNode) {
      bitcoin.networkNodes.push(networkNodeUrl);
    }
    //error handling ^
  });
  res.json({ note: 'bulk registration successful.' });
});

app.get('/consensus', function(req, res) {
  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/blockchain',
      method: 'GET',
      //get requests do not have any body: to them
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises).then(blockchains => {
    const currentChainLength = bitcoin.chain.length;
    let maxChainLength = currentChainLength;
    let newLongestChain = null;
    let newPendingTransactions = null;

    blockchains.forEach(blockchain => {
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendingTransactions = blockchain.pendingTransactions;
      }
    });
    if (
      !newLongestChain ||
      (newLongestChain && !bitcoin.chainIsValid(newLongestChain))
    ) {
      res.json({
        note: 'Current chain has not been replaced',
        chain: bitcoin.chain
      });
    } else {
      bitcoin.chain = newLongestChain;
      bitcoin.pendingTransactions = newPendingTransactions;
      res.json({
        note: 'This chain has been replaced',
        chain: bitcoin.chain
      });
    }
  });
});
app.get('/block/:blockHash', function(req, res) {
  //this is going to actually send the blockhash in the URL
  //i.e localhost:3000/block/0000LJDF39J123KJDISOFDLKFJAODIF
  const blockHash = req.params.blockHash;
  const correctBlock = bitcoin.getBlock(blockHash);
  res.json({
    block: correctBlock
  });
});

app.get('/transaction/:transactionId', function(req, res) {
  const transactionId = req.params.transactionId;

  //i thinkt he line above pulls from URL. IT DOES. Itested it.
  // req.params is pulling from the /:transactionId
  const transactionData = bitcoin.getTransaction(transactionId);
  //this is taking that info from above and passin into a backend request
  res.json({
    transaction: transactionData
  });
});

app.get('/address/:address', function(req, res) {
  const address = req.params.address;
  const addressData = bitcoin.getAddressData(address);
  res.json({
    addressData: addressData
  });
});

app.get('/block-explorer', function(req, res) {
  res.sendFile('./block-explorer/index.html', { root: __dirname });
  // dirname is pointing to the directory that index.html is in
});
//the port bleow is in package.json
app.listen(port, function() {
  console.log(`Listening on port ${port} baby!.....`);
});
