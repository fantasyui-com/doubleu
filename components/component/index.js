const diffDOM = require("diff-dom");

class Component {

  constructor(...blocks){

    this.data = new Object();
    // this.data.domNode = document.createElement('div');
    this.data.connectors = new Set(); // Connection
    this.data.connections = new Set(); // Connection
    this.data.classes = new Set(); // Class
    this.data.styles = new Object(); // Style
    this.data.children = new Map(); // Tag Template Text ! // NOTE: this.data.children.REGION_NAME = [child, child, child];


    this.initializeProperties();
    this.initializeListeners();



  }

  initializeProperties(){

        blocks.filter(i=>i.constructor.name==='Style').forEach( block => {
          Object.assign(this.data.styles, block.style);
        });

        blocks.filter(i=>i.constructor.name==='Class').forEach( block => {
          block.classNames.forEach(className=>this.data.classes.add(className));
        });

        blocks.filter(i=>i.constructor.name==='Text').forEach( block => {
          if(!this.data.children.has(block.region)) this.data.children.set(block.region, new Array());
          this.data.children.get(block.region).push(block);
        });

        blocks.filter(i=>i.constructor.name==='Connector').forEach( block => {
          this.data.connectors.add(block);
        });

        blocks.filter(i=>i.constructor.name==='Connection').forEach( block => {
          this.data.connections.add(block);
        });
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

    // const node = document.createElement('div');
    // this.renderData(data, node);
    // const dd = new diffDOM({ valueDiffing: false });
    // const diff = dd.diff(this.data.domNode, node);
    // dd.apply(this.data.domNode, diff);

  }

  renderData(data, node){
    // this.data.children.get('main') ... node.createElement('div') ...
  }

  mount(parent){

    parent.appendChild(this.data.domNode);
    return this;

  }

}

module.exports = Component;
