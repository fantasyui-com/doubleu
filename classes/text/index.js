class Text {
  constructor(data="", region='main'){
    this.data = data;
    this.region = region;
  }
  createElement(){
    return document.createTextNode(this.data);
  }
}

module.exports = Text;
