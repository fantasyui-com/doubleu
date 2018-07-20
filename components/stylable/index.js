const kebab = require('lodash/kebabCase');

const Reactive = require("../reactive");

class Stylable extends Reactive {

  constructor(...blocks){

    super(...blocks);
    this.log(`Constructor: Stylable`)

    this.data.classes = new Set(); // Class
    this.data.styles = new Object(); // Style

    this.data.classes.add(kebab(this.constructor.name));

    this.blocks.filter(i=>i.constructor.name==='Style').forEach( block => {
      Object.assign(this.data.styles, block.style);
    });

    this.blocks.filter(i=>i.constructor.name==='Class').forEach( block => {
      block.classNames.forEach(className=>this.data.classes.add(className));
    });

  }

}

module.exports = Stylable;
