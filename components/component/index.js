class Component {
  constructor(...blocks){

    // { Connection, Style, Class, Region, Tag, Template, Text }
    this.connections = new Set(); // Connection
    this.classes = new Set(); // Class
    this.regions = new Map(); // Region

    this.styles = new Map(); // Style

    this.children = new Set(); // Tag Template Text

    // blocks.forEach((block)=>{
    //   console.log(block.constructor.name)
    // });
    //
    //
    // blocks.reduce((accumulator, currentBlock) => {
    //   return accumulator[currentBlock.constructor.name];
    // }, this);

    // blocks.filter(i=>i.constructor.name==='Connection').forEach( item => {
    //   this.connections.add(item);
    // });

    // blocks.filter(i=>i.constructor.name==='Class').forEach( item => {
    //   this.classs.add(item);
    // });


    blocks.filter(i=>i.constructor.name==='Text').forEach( block => {
      this.children.add(block);
    });


  }
}
module.exports = Component;
