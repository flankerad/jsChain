cont SHA256  = require('crypto-js'/sha256);

class Blockchain {
	constructor(index, timestamp, data, previousHash='') {
	this.index = index;
	this.timestamp = timestamp;
	this.data = data;
	this.previousHash = previousHash;
	this.hash = '';

	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString());
	}

}