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
