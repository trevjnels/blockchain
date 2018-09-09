const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

// 20180908162503
// http://localhost:3001/blockchain
//prettier-ignore
const bc1 = {
  "chain": [
    {
      "index": 1,
      "timestamp": 1536445835625,
      "transactions": [

      ],
      "nonce": 100,
      "hash": "0",
      "previousBlockHash": "0"
    },
    {
      "index": 2,
      "timestamp": 1536445892378,
      "transactions": [

      ],
      "nonce": 18140,
      "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
      "previousBlockHash": "0"
    },
    {
      "index": 3,
      "timestamp": 1536446222573,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "cdfeae80b3b611e89be18f26da26e261",
          "transactionId": "efd6c650b3b611e89be18f26da26e261"
        },
        {
          "amount": 10,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "a7ea3010b3b711e89be18f26da26e261"
        },
        {
          "amount": 20,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "acbee9a0b3b711e89be18f26da26e261"
        },
        {
          "amount": 30,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "aff77f60b3b711e89be18f26da26e261"
        }
      ],
      "nonce": 60552,
      "hash": "000063883f637ae8539024c03d8fc7c79084d473aae89fa7ec8c9ccf02248f41",
      "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
      "index": 4,
      "timestamp": 1536446267823,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "cdfeae80b3b611e89be18f26da26e261",
          "transactionId": "b4a2df00b3b711e89be18f26da26e261"
        },
        {
          "amount": 40,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "c6034410b3b711e89be18f26da26e261"
        },
        {
          "amount": 50,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "c7de93c0b3b711e89be18f26da26e261"
        },
        {
          "amount": 60,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "cb573fc0b3b711e89be18f26da26e261"
        },
        {
          "amount": 70,
          "sender": "adfjlakjdf",
          "recipient": "Braddfafadadfy",
          "transactionId": "ce5c6970b3b711e89be18f26da26e261"
        }
      ],
      "nonce": 16460,
      "hash": "0000b9a5a1eeafae0c94cb28deb21786f6be6f295cbf93f001291e580131a8ee",
      "previousBlockHash": "000063883f637ae8539024c03d8fc7c79084d473aae89fa7ec8c9ccf02248f41"
    },
    {
      "index": 5,
      "timestamp": 1536446281342,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "cdfeae80b3b611e89be18f26da26e261",
          "transactionId": "cf9b5210b3b711e89be18f26da26e261"
        }
      ],
      "nonce": 128110,
      "hash": "0000ccf3a6867e901ce5464927a97217062c06e25700fa69a2f2d2835cfb44df",
      "previousBlockHash": "0000b9a5a1eeafae0c94cb28deb21786f6be6f295cbf93f001291e580131a8ee"
    },
    {
      "index": 6,
      "timestamp": 1536446284604,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "cdfeae80b3b611e89be18f26da26e261",
          "transactionId": "d7aa7620b3b711e89be18f26da26e261"
        }
      ],
      "nonce": 142850,
      "hash": "00006d103314bf5cf094f0851ab2eaed536c09bf92239ea8ff6b1e7d4ba10f1c",
      "previousBlockHash": "0000ccf3a6867e901ce5464927a97217062c06e25700fa69a2f2d2835cfb44df"
    }
  ],
  "pendingTransactions": [
    {
      "amount": 12.5,
      "sender": "00",
      "recipient": "cdfeae80b3b611e89be18f26da26e261",
      "transactionId": "d99c3400b3b711e89be18f26da26e261"
    }
  ],
  "currentNodeUrl": "http://localhost:3001",
  "networkNodes": [

  ]
}
//{
//   "chain": [
//     {
//       "index": 1,
//       "timestamp": 1536437970446,
//       "transactions": [],
//       "nonce": 100,
//       "hash": '0',
//       "previousBlockHash": '0'
//     },
//     {
//       "index": 2,
//       "timestamp": 1536438175887,
//       "transactions": [],
//       "nonce": 53901,
//       "hash": '00009a5055cd9a756df37c0aa3c5ab4f3695e8e57cf5ead7d781abb29411ebd7',
//       "previousBlockHash": '0'
//     },
//     {
//       "index": 3,
//       "timestamp": 1536438179370,
//       "transactions": [
//         {
//           "amount": 12.5,
//           "sender": '00',
//           "recipient": '7dfbc2e0b3a411e880e1edb65c4ea5d7',
//           "transactionId": 'f8755e50b3a411e880e1edb65c4ea5d7'
//         }
//       ],
//       "nonce": 1533,
//       "hash": '0000bfb6a4604837495afe787ab67b2df7d2bb397096d891dfb55889a2f93343',
//       "previousBlockHash":
//         '00009a5055cd9a756df37c0aa3c5ab4f3695e8e57cf5ead7d781abb29411ebd7'
//     },
//     {
//       "index": 4,
//       "timestamp": 1536438184865,
//       "transactions": [
//         {
//           "amount": 12.5,
//           "sender": '00',
//           "recipient": '7dfbc2e0b3a411e880e1edb65c4ea5d7',
//           "transactionId": 'fa83a4e0b3a411e880e1edb65c4ea5d7'
//         }
//       ],
//       "nonce": 45536,
//       "hash": '0000da8273d2a6209996d29e1ceaaec0c6169ad4665dd7f422a2234d68d539d2',
//       "previousBlockHash":
//         '0000bfb6a4604837495afe787ab67b2df7d2bb397096d891dfb55889a2f93343'
//     },
//     {
//       "index": 5,
//       "timestamp": 1536438290950,
//       "transactions": [
//         {
//           "amount": 12.5,
//           "sender": '00',
//           "recipient": '7dfbc2e0b3a411e880e1edb65c4ea5d7',
//           "transactionId": 'fdc9cf30b3a411e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 180,
//           "sender": 'ARGH',
//           "recipient": 'Brazillion',
//           "transactionId": '0a26a280b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 10,
//           "sender": 'jules',
//           "recipient": 'Brady',
//           "transactionId": '10779bd0b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 1130,
//           "sender": 'adfjlakjdf',
//           "recipient": 'Braddfafadadfy',
//           "transactionId": '1c05d480b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 40,
//           "sender": 'adfjlakjdf',
//           "recipient": 'Braddfafadadfy',
//           "transactionId": '2ef0aa20b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 50,
//           "sender": 'adfjlakjdf',
//           "recipient": 'Braddfafadadfy',
//           "transactionId": '309fe0c0b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 59060,
//           "sender": 'adfjlakjdf',
//           "recipient": 'Braddfafadadfy',
//           "transactionId": '32fe1c10b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 1,
//           "sender": 'adfjlakjdf',
//           "recipient": 'Braddfafadadfy',
//           "transactionId": '34b6c890b3a511e880e1edb65c4ea5d7'
//         },
//         {
//           "amount": 4232,
//           "sender": 'adfjlakjdf',
//           "recipient": 'Braddfafadadfy',
//           "transactionId": '36bde330b3a511e880e1edb65c4ea5d7'
//         }
//       ],
//       "nonce": 71138,
//       "hash": '00006695a1c0feb10feaf82157ec189c5a9ff1c59a7def6726949dc0ddb6f63d',
//       "previousBlockHash":
//         '0000da8273d2a6209996d29e1ceaaec0c6169ad4665dd7f422a2234d68d539d2'
//     },
//     {
//       "index": 6,
//       "timestamp": 1536438291907,
//       "transactions": [
//         {
//           "amount": 12.5,
//           "sender": '00',
//           "recipient": '7dfbc2e0b3a411e880e1edb65c4ea5d7',
//           "transactionId": '3d0566a0b3a511e880e1edb65c4ea5d7'
//         }
//       ],
//       "nonce": 3176,
//       "hash": '0000851ac12a0c801b5b31757701179d5a8488b9fe48b5e599d89d46426975b4',
//       "previousBlockHash":
//         '00006695a1c0feb10feaf82157ec189c5a9ff1c59a7def6726949dc0ddb6f63d'
//     }
//   ],
//   "pendingTransactions": [
//     {
//       "amount": 12.5,
//       "sender": '00',
//       "recipient": '7dfbc2e0b3a411e880e1edb65c4ea5d7',
//       "transactionId": '3d971f50b3a511e880e1edb65c4ea5d7'
//     }
//   ],
//   "currentNodeUrl": 'http://localhost:3001',
//   "networkNodes": []
// };

console.log('valid: ' + bitcoin.chainIsValid(bc1.chain));
//play data

// const previousBlockHash = '0INADHFLAKDJFOIJ398J9FAF939300UFDKJH';
// const currentBlockData = [
//   {
//     amount: 10,
//     sender: 'NDLFKJ399F0F',
//     recipient: 'DTF93820392'
//   },
//   {
//     amount: 20,
//     sender: 'FFFKDFAD99F0F',
//     recipient: 'BLOW820392'
//   },
//   {
//     amount: 30,
//     sender: 'DFLKJA9F0F',
//     recipient: 'SUCK820392'
//   }
// ];
