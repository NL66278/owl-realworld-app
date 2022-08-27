import {Component, xml} from '../lib/owl.es.js';
import {MyComponent} from './components/my_component.js';

const APP_TEMPLATE = xml/*xml*/ `
<main t-name="App" class="" t-on-click="update">
  <MyComponent/>
</main>
`;

export class Root extends Component {
    static template = APP_TEMPLATE;
    static components = {MyComponent};
}
