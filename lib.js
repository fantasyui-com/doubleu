var kebabCase = require('lodash/kebabcase');
var flatten = require('lodash/flatten');
var compact = require('lodash/compact');

class Connector {
  constructor(eventEmitter){
    this.eventEmitter = eventEmitter;
  }
}

class Connection {
  constructor(eventName){
    this.eventName = eventName;
  }
}

class Style {
  constructor(style){
    this.style = style;
  }
}

class Class {
  constructor(data){
    this.classNames = data.split(" ");
  }
}

class Region {
  constructor(){
  }
}

class Tag {
  constructor(nodeName="div", objectAttributes={}, region='main'){
    this.nodeName = nodeName;
    this.region = region;

    this.attributes = new Map();
    this.classes = new Set();


    Object.keys(objectAttributes).forEach( attribute => {
      // if value is an object then this is attributes.style = ...
      if(typeof objectAttributes[attribute] === 'object'){
        // it is an attribute with an object based value style = {color: 'red'}
        const attributeName = attribute;
        let attributeValue = ''; // prepare the string to be built
        // Build the string....
        Object.keys(objectAttributes[attribute]).forEach(function(subAttribute){
          const key = subAttribute;
          const val = objectAttributes[attribute][subAttribute];
          attributeValue = attributeValue + `${kebabCase(key)}: ${val}; `
        })
        // clean it
        attributeValue = attributeValue.trim();
        // store it for latr use
        this.attributes.set(attributeName, attributeValue)

      }else if(attribute === 'class'){

        // Attribute is a class, we use a Set here as multiple sources of class are present, set will dedupe
        const attributeName = attribute;
        const attributeValue = objectAttributes[attribute];
        // store it for latr use
        attributeValue.split(" ").forEach(className=>{
          this.classes.add(className)
        });

      } else {

        // not a value object (styles)
        // not a class (dedupe)
        // just a plain text property
        const attributeName = attribute;
        const attributeValue = objectAttributes[attribute];
        // store it for latr use
        this.attributes.set(attributeName, attributeValue)

      }
    })


  }
  createElement(){

    const element = document.createElement(this.nodeName);

    // attributes, all values here are strings prepped up above
    for (var [attributeName, attributeValue] of this.attributes) {
      element.setAttribute(attributeName, attributeValue);
    }

    // Take care of class="" ensure no dupes, etc...
    // note this behaves as if element already had some classes, future proof...

    if(this.classes.length){
      (element.getAttribute('class')||'').split(" ").filter(i=>i.trim()).forEach(function(c){classes.add(c)})
      element.setAttribute('class', Array.from(this.classes).join(" "))
    }

    //element.appendChild(document.createTextNode('Bork!'));
    return element;

  }
}

class Template {
  constructor(data, region='main'){
    this.data = data;
    this.region = region;
  }
}

class Text {
  constructor(data="", region='main'){
    this.data = data;
    this.region = region;
  }
  createElement(){
    return document.createTextNode(this.data);
  }
}

module.exports = { Connector, Connection, Style, Class, Region, Tag, Template, Text };
