const { StandardApplication, Emitter, Connection, Style, Class, Region, Tag, Template, Text, Connector } = require('.');

const emitter = new Emitter();

class BootstrapSidebar {}
class BootstrapStatus {}
class BootstrapCardBlock {}

new StandardApplication(

  new Connector(emitter),
  new Connection('/applications/todo/control'),
  new Style({ float: 'left', width: '200px' }),
  new Tag('div', {style: {backgroundColor: 'red', height:'100px'}}),
  new Text('Hello World!'),

).mount(document.body);

let counter = 1;

emitter.emit('/applications/todo/control', [

		{meta:{ identity:'idc219000b8e8f4ea7a125ae1023cc821d', version:'3453,5756a44f3b0141d3aa5627f506181c2f',    token:'b5115bc0961247eaa6eb1dba54b204ed', deleted:false}, data:{value:'a'+counter, values:['four','five','six','x'+counter]}},
		{meta:{ identity:'id8849201d21cb44dda43f012d89a2a101', version:'3458535,efc6d0f6f9d243539efc6c8cf63120c2', token:'699a268232dc4f139cbc3c34906dcd79', deleted:true}, data:{value:'b'+counter, values:['four','five','six','x'+counter]}},
		{meta:{ identity:'ide4c6dc676f744fdbbd8560f0768cdb5e', version:'6458736,ef8442e28a0a473bb90a586b70557513', token:'c7df13597f4a4479befeb211fb857beb', deleted:false}, data:{value:'c'+counter, values:['four','five','six','x'+counter]}},

])
