const Stylable = require("../stylable");
var Text = require('../../classes/text');

class Component extends Stylable {

  constructor(...blocks){

    super(...blocks);
    this.log(`Constructor: Component`)
    this.data.children = new Map(); // Tag Template Text ! // NOTE: this.data.children.REGION_NAME = [child, child, child];
    this.blocks.filter(i=>( (typeof i === 'string') || i.constructor.name==='Text' || i.constructor.name==='Tag') || i instanceof Component).forEach( block => {
      if(typeof block === 'string'){
        block = new Text(block);
      }

      if(this.data.object) block.data.object = this.data.object;

      const region = block.region||'main';
      if(!this.data.children.has(region)) this.data.children.set(region, new Array());
      this.data.children.get(region).push(block);
    });

  }

  mount(parent){
    parent.appendChild(this.data.domNode);
    return this;
  }

  start(){
    this.log('Start Called');
    this.patch();
    return this;
  }

}

module.exports = Component;
