
const { Connection, Style, Class, Region, Tag, Template, Text } = require('./lib.js');

const StandardApplication = require('./components/standard-application');
class BootstrapSidebar {}
class BootstrapStatus {}
class BootstrapCardBlock {}

// console.log(
//
// // document.body.appendChild(
//
//   new StandardApplication(
//     new Connection('/applications/todo/control'),
//     new Style({ float: 'left', width: '200px' }),
//     new Class("red zone"),
//     new Region('menu', new Connection('/applications/todo/menu')),
//     new Region('sidebar', new BootstrapSidebar()),
//     new Region('status', new BootstrapStatus()),
//     new Region('main', [
//       new Tag('h1.classy', new Text('Hello!')),
//       new Tag('h1.classy', new Text('Bueno!')),
//       new BootstrapCardBlock(
//           new Connection('/applications/todo/cards'),
//           new Template(['h1.classy', 'Hello!'])
//       )
//     ]),
//   )
//   //})
//
// // )
//
//  );


console.log(
  new StandardApplication(
    new Text('Hello World!')
  )
);
