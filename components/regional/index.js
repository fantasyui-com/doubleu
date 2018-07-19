class Regional {

  constructor(...blocks){
    console.log(`Constructor: Regional`)

    this.blocks = blocks;

    this.region = 'main'
    this.blocks.filter(i=>i.constructor.name==='Region').forEach( block => {
      this.region = block.region;
    });
  }

}

module.exports = Regional;
