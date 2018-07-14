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
  constructor(){
  }
}

class Class {
  constructor(){
  }
}

class Region {
  constructor(){
  }
}

class Tag {
  constructor(){
  }
}

class Template {
  constructor(){
  }
}

class Text {
  constructor(data){
    this.data = data;
  }
}

module.exports = { Connector, Connection, Style, Class, Region, Tag, Template, Text };
