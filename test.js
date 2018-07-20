const { StandardApplication, Component, Emitter, Connection, Style, Class, Region, Tag, Template, Text, Connector } = require('.');

class Data {
  constructor(data={}){
    this.data = data;
  }
}



const emitter = new Emitter();

class BootstrapSidebar extends Component {}

class CardGroup extends Component {

  constructor(...blocks){
    super(...blocks);
    this.data.classes.add('card-group');
  }

}

class Card extends Component {

  constructor(...blocks){
    super(...blocks);
    'text-white bg-dark mb-3'.split(' ').map(i=>this.data.classes.add(i));
    this.log([...this.data.classes].join(' '));
  }

  // render(parent){
  // //   this.log(`BootstrapCard.render called`);
  // //   const container = document.createElement('div')
  // //   //container.setAttribute('style', 'border: 2px solid lime; padding: 1rem;');
  // //   const element = document.createTextNode('Parent');
  // //   container.appendChild(element);
  // //   parent.appendChild(container);
  //   super.render(parent);
  // }

}

class CardBody extends Component {

  // render(parent){
  //   // const container = document.createElement('div')
  //   // container.setAttribute('style', 'border: 2px solid lime; padding: 1rem;');
  //   // const element = document.createTextNode('Child');
  //   // container.appendChild(element);
  //   // parent.appendChild(container);
  //   super.render(parent);
  // }

}

class CardText extends Component {

  constructor(...blocks){
    super(...blocks);
    this.data.tagName = 'p';
  }

  render(parent){

    console.log('CardText: this.data.object', this.data.object )

    if(this.data.object){
      const text = document.createTextNode(this.data.object.text);
      console.log(text);
      console.log(parent);
      parent.appendChild(text);
    }

    super.render(parent); // may add more text children...
  }

}



const app = new StandardApplication(

    new Data({}),

    new Connector(emitter),
    new Connection('/applications/todo/control'),
    new Connection('/applications/todo/some-text'),
    new Style({ float: 'left', width: '200px' }),

    new CardGroup(

      new Card(

        new CardBody(

          new CardText("Line One")

        ),

        new CardBody(

          new CardText(
          )

        ),

        new CardBody(

          new CardText("End Line")

        ),
      )

    )

  )
  .mount(document.body)
  .start();


/// REACTIVE TESTING

let counter = 1;
//
// emitter.emit('/applications/todo/control', [
//
// 		{meta:{ identity:'idc219000b8e8f4ea7a125ae1023cc821d', version:'3453.5756a44f3b0141d3aa5627f506181c2f',    token:'b5115bc0961247eaa6eb1dba54b204ed', deleted:false}, data:{value:'a'+counter, values:['four','five','six','x'+counter]}},
// 		{meta:{ identity:'id8849201d21cb44dda43f012d89a2a101', version:'3458535.efc6d0f6f9d243539efc6c8cf63120c2', token:'699a268232dc4f139cbc3c34906dcd79', deleted:true}, data:{value:'b'+counter, values:['four','five','six','x'+counter]}},
// 		{meta:{ identity:'ide4c6dc676f744fdbbd8560f0768cdb5e', version:'6458736.ef8442e28a0a473bb90a586b70557513', token:'c7df13597f4a4479befeb211fb857beb', deleted:false}, data:{value:'c'+counter, values:['four','five','six','x'+counter]}},
//
// ])



setInterval(function(){
  counter++;

  emitter.emit('/applications/todo/some-text', [
    {meta:{ identity:'idc219000b8e8f4ea7a125ae1023cc821d', version:'3453.5756a44f3b0141d3aa5627f506181c2f',    token:'b5115bc0961247eaa6eb1dba54b204ed', deleted:false}, data:{ key:'text', value:'a'+counter }},
  ])

},333)
