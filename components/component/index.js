const diffDOM = require("diff-dom");

class Component {

  constructor(...blocks){

    this.data = new Object();
    this.data.domNode = document.createElement('div');
    this.data.connectors = new Set(); // Connection
    this.data.connections = new Set(); // Connection
    this.data.classes = new Set(); // Class
    this.data.regions = new Map(); // Region
    this.data.styles = new Map(); // Style
    this.data.children = new Map(); // Tag Template Text
    this.data.children.set('main', new Array());

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
      this.data.children.get('main').push(block);
    });

    blocks.filter(i=>i.constructor.name==='Connector').forEach( block => {
      this.data.connectors.add(block);
    });

    blocks.filter(i=>i.constructor.name==='Connection').forEach( block => {
      this.data.connections.add(block);
    });

    // -- //
    initializeListeners();



  }

  initializeListeners(){

    this.data.connectors.forEach( connector => {
      this.data.connections.forEach( connection => {
        connector.eventEmitter.on(connection.eventName, data => {
          console.log(`${this.constructor.name} heard ${connection.eventName} with ${JSON.stringify(data)}`);
          this.patchNode(data);
        })
      })
    })

  }

  patchNode(data){

    const node = document.createElement('div');
    this.renderData(data, node);
    const dd = new diffDOM({ valueDiffing: false });
    const diff = dd.diff(this.data.domNode, node);
    dd.apply(this.data.domNode, diff);

  }

  renderData(data, node){
    // node.createElement('div') ...
  }

  childNodes(){

  }

}

module.exports = Component;
