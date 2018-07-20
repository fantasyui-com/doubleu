class Regional {

  constructor(...blocks){

    this.data = new Object();

    this.data.tagName = 'div';
    this.debug = true;
    this.log = this.debug?console.log.bind(console):function(){};

    this.log(`Constructor: Regional`)

    this.blocks = blocks;

    this.region = 'main'
    this.blocks.filter(i=>i.constructor.name==='Region').forEach( block => {
      this.region = block.region;
    });
  }

}

module.exports = Regional;
