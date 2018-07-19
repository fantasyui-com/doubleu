const diffDOM = require("diff-dom");
const Regional = require("../regional");

class Reactive extends Regional {

  constructor(...blocks){
    super(...blocks);
    console.log(`Constructor: Reactive`)


    this.data = new Object();
    this.data.content = new Object();

    this.data.domNode = document.createElement('div');
    this.data.newNode = document.createElement('div');

    this.data.connectors = new Set(); // Connection
    this.data.connections = new Set(); // Connection

    this.blocks.filter(i=>i.constructor.name==='Connector').forEach( block => {
      this.data.connectors.add(block);
    });

    this.blocks.filter(i=>i.constructor.name==='Connection').forEach( block => {
      this.data.connections.add(block);
    });

    this.data.connectors.forEach( connector => {
      this.data.connections.forEach( connection => {
        connector.eventEmitter.on(connection.eventName, data => {
          // console.log(`${this.constructor.name} heard ${connection.eventName} with ${JSON.stringify(data)}`);
          Object.assign( this.data.content , data );
          this.patchNode();
        })
      })
    })

  }




  patchNode(){

    delete this.data.newNode;
    this.data.newNode = document.createElement('div');

    this.render(this.data.newNode);

    const dd = new diffDOM({ valueDiffing: false });
    const diff = dd.diff(this.data.domNode, this.data.newNode);
    dd.apply(this.data.domNode, diff);

  }

  render(parent){
    this.recurse(parent);
  }

  recurse(parent){
    // this.data.children.get('main') ... node.createElement('div') ...
    // this.data.content

    // new Tag('div', {style: {backgroundColor: 'red', height:'100px'}}),
    // new Text('Hello World!'),

    for (var region of this.data.children.keys()) {
      this.data.children.get(region).forEach( entry => {

        //console.log(entry.constructor.name, entry)
        if(entry && entry.patchNode) entry.patchNode();
        const element = entry.createElement();
        parent.appendChild(element)

      });

    }

    // for (var region of this.data.children.keys()) {
    //   this.data.children.get(region).forEach( entry => {
    //     console.log(entry.constructor.name, entry)
    //     if(entry && entry.patchNode) entry.patchNode();
    //     const element = entry.createElement();
    //     this.data.newNode.appendChild(element)
    //   });
    // }

  }

  createElement(){
    return this.data.domNode;
  }

}

module.exports = Reactive;
