const SHA246 = require('crypto-js/sha256');
class Block {
    constructor(timestamp, data, previousHash = '') {
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA246(this.timestamp + this.previousHash + this.nonce + JSON.stringify(this.data)).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(this.hash);
    }
}
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty=2;
    }
    createGenesisBlock() {
        return new Block( "01/01/2019", "genesis block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];
            if (currentBlock.calculateHash() !== currentBlock.hash) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            return true;
        }
    }
}

let satyam = new BlockChain();
console.log("mining 1");
satyam.addBlock(new Block( Date.now(), {
    name: "Satyam",
    voted: "BJP",
    faceId: "12452dsjhadf"
}));
console.log("mining 2");
satyam.addBlock(new Block( Date.now(), {
    name: "vaibhav",
    voted: "Congress",
    faceId: "124dsf52dsjhadf"
}));

console.log(satyam.isChainValid());
console.log(JSON.stringify(satyam, null, 4));