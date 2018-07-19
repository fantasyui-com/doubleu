const Stylable = require("../stylable");

class Component extends Stylable {

  constructor(...blocks){
    super(...blocks);
    console.log(`Constructor: Component`)

    this.data.children = new Map(); // Tag Template Text ! // NOTE: this.data.children.REGION_NAME = [child, child, child];

    this.blocks.filter(i=>(i.constructor.name==='Text'||i.constructor.name==='Tag')||i instanceof Component).forEach( block => {
      const region = block.region||'main';
      if(!this.data.children.has(region)) this.data.children.set(region, new Array());
      this.data.children.get(region).push(block);
    });

  }



  mount(parent){

    parent.appendChild(this.data.domNode);
    this.patchNode();
    return this;

  }

}

module.exports = Component;
