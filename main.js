
const {Blockchain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('07f8eae36affb1fc61d774ec7b78ee0c728b6af16766cf69a171fd95691f343f');
const myWalletAddress = myKey.getPublic('hex');


let jsCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key here', 10);
tx1.signTransaction(myKey);
jsCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
jsCoin.minePendingTransactions(myWalletAddress);

//Mining the block to get the reward for the previous mining
jsCoin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of flanker is ', jsCoin.getBalanceOfAddress(myWalletAddress));



/* jsCoin.createTransaction(new Transaction('address 1', 'address 2', 100));
// jsCoin.createTransaction(new Transaction('address 2', 'address1', 50));

console.log('\nStarting the miner...');
jsCoin.minePendingTransactions('flankers-address');
console.log('\n Balance of flanker is ', jsCoin.getBalanceOfAddress('flankers-address'));

console.log('\nStarting the miner...');
jsCoin.minePendingTransactions('flankers-address');
console.log('\nBalance of flanker is ', jsCoin.getBalanceOfAddress('flankers-address'));


/*
console.log("Mining block 1...");
jsCoin.addBlock(new Block(1, "19/5/2019", { amount: 4 }));

console.log("Mining block 2...");
jsCoin.addBlock(new Block(2, "20/5/2019", { amount: 5 }));

//console.log(JSON.stringify(jsCoin, null, 4));

//Manuplating with the blockchain
//jsCoin.chain[1].data = { amount : 100 };
//jsCoin.chain[1].hash = jsCoin.chain[1].calculateHash();

//console.log('Is the blockchain valid? ' + jsCoin.isChainValid());
*/

