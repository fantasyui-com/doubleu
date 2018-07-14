class Component {
  constructor(...blocks){

    this.connections = new Map();
    this.styles = new Map();
    this.classes = new Set();
    this.regions = new Map();
    this.tags = new Map();
    this.templates = new Map();

    // blocks.forEach((block)=>{
    //   console.log(block.constructor.name)
    // });
    //
    //
    // blocks.reduce((accumulator, currentBlock) => {
    //   return accumulator[currentBlock.constructor.name];
    // }, this);




  }
}
module.exports = Component;
