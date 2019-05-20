cont SHA256  = require('crypto-js'/sha256);

class Block{
	constructor(index, timestamp, data, previousHash='') {
	this.index = index;
	this.timestamp = timestamp;
	this.data = data;
	this.previousHash = previousHash;
	this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString());
	}
}

class Blockchain {
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2019", "Genesis Block", "0")
	}

	getLatestBlockMethod(){
		return this.chain[this.chain.length-1]
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
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
jsCoin.addblock(new Block(1, "19/5/2019", { amount: 4 }));
jsCoin.addblock(new Block(2, "20/5/2019", { amount: 5 }));

//console.log(JSON.stringify(jsCoin, null, 4));

//Manuplating with the blockchain
jsCoin.chain[1].data = { amount : 100 };
jsCoin.chain[1].hash = jsCoin.chain[1].calculateHash();

console.log('Is the blockchain valid? ' + jsCoin.isChainValid());

