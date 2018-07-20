const diffDOM = require("diff-dom");
const Regional = require("../regional");

class Reactive extends Regional {

  constructor(...blocks){
    super(...blocks);
    this.log(`Constructor: Reactive`)

    this.data.object = null;

    this.data.content = new Object();

    this.data.domNode = document.createElement(this.data.tagName);
    this.data.newNode = document.createElement(this.data.tagName);

    this.data.connectors = new Set(); // Connection
    this.data.connections = new Set(); // Connection

    this.blocks.filter(i=>i.constructor.name==='Data').forEach( block => {
      this.data.object = block.object;
    });



    this.blocks.filter(i=>i.constructor.name==='Connector').forEach( block => {
      this.data.connectors.add(block);
    });

    this.blocks.filter(i=>i.constructor.name==='Connection').forEach( block => {
      this.data.connections.add(block);
    });

    this.data.connectors.forEach( connector => {
      this.data.connections.forEach( connection => {
        connector.eventEmitter.on(connection.eventName, list => {
          // console.log(`${this.constructor.name} heard ${connection.eventName} with ${JSON.stringify(data)}`);

          let componentShouldUpdate = false;
          list.forEach(remote=>{

            const local = this.data.content[ remote.meta.identity ];
            const exists = local !== undefined;

            if(exists){
              const newer = remote.meta.version > local.meta.version;
              if(newer){
                const deleted = remote.meta.deleted;
                if(deleted){
                  // object was deleted, treat it like a standard update
                  this.data.content[ remote.meta.identity ] = remote;
                  componentShouldUpdate = true;
                  if(this.data.object && remote.data.key && remote.data.value){
                    delete this.data.object[remote.data.key]
                  }
                }else{
                  // object is active, and newer version
                  this.data.content[ remote.meta.identity ] = remote;
                  componentShouldUpdate = true;
                  if(this.data.object && remote.data.key && remote.data.value){
                    this.data.object[remote.data.key] = remote.data.value;
                  }
                }
              }else{
                // looks like an older object, we don't need it
              }
            }else{
              // did not exist add it
              this.data.content[ remote.meta.identity ] = remote;
              componentShouldUpdate = true;
              if(this.data.object && remote.data.key && remote.data.value){
                this.data.object[remote.data.key] = remote.data.value;
              }
            }
          });

          // Object.assign( this.data.content , data );
          if(componentShouldUpdate) {
            this.log('Data Update...', this.data.object, this.data.content, componentShouldUpdate)
            this.patch();
          }

        })
      })
    })

  }




  patch(){

    this.log(`Patch was called in Reactive`)

    delete this.data.newNode;
    this.data.newNode = document.createElement('div');
    this.data.newNode.setAttribute('class', [...this.data.classes].join(' '))

    this.log(`${this.constructor.name}: newNode class attribute="${this.data.newNode.getAttribute('class')}" for`, this.data.classes )

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

        console.log(entry.constructor.name, entry)
        if(entry && entry.patch) entry.patch();
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
