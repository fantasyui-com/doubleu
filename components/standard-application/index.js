const Component = require('../component');

class StandardApplication extends Component {
  constructor(...blocks){
    super(...blocks);
    console.log(`Constructor: StandardApplication`)
  }
}
module.exports = StandardApplication;
