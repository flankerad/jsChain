const SHA256  = require('crypto-js/sha256');

class Transaction{
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

class Block{
	constructor(timestamp, transactions, previousHash='') {
 	this.timestamp = timestamp;
	this.transactions = transactions;
	this.previousHash = previousHash;
	this.hash = this.calculateHash();
	this.nonce = 0
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !==  Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("Block mined: "+ this.hash);
	}
}

class Blockchain {
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock(){
		return new Block("01/01/2019", "Genesis Block", "0")
	}

	getLatestBlock(){
		return this.chain[this.chain.length-1]
	}

	minePendingTransactions(miningRewardAddress){
		let block = new Block(Date.now(), this.pendingTransactions);
		block.mineBlock(this.difficulty);

		console.log('Block succesfully mined');
		this.chain.push(block);
		this.pendingTransactions = [
			new Transaction(null, miningRewardAddress, this.miningReward)
		];
	}

	createTransaction(transaction){
		this.pendingTransactions.push(transaction)
	}

	getBalanceOfAddress(address){
		let balance = 0;
		for(const block of this.chain){
			for(const trans of block.transactions){

				if(trans.fromAddress === address){
					balance -= trans.amount;
				}
				if(trans.toAddress === address){
					balance += trans.amount;
				}

			}
		}

		return balance;
	}

	isChainValid(){
		for(let i=1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			if(currentBlock.hash != currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}

let jsCoin = new Blockchain();

jsCoin.createTransaction(new Transaction('address 1', 'address 2', 100));
jsCoin.createTransaction(new Transaction('address 2', 'address1', 50));

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

