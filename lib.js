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
  constructor(data, region='main'){
    this.data = data;
    this.region = region;
  }
}

class Template {
  constructor(data, region='main'){
    this.data = data;
    this.region = region;
  }
}

class Text {
  constructor(data, region='main'){
    this.data = data;
    this.region = region;
  }
}

module.exports = { Connector, Connection, Style, Class, Region, Tag, Template, Text };
