import {Component, useState, xml} from '../../lib/owl.es.js';

const MY_COMPONENT_TEMPLATE = xml/*xml*/ `
<span t-name="MyComponent" class="" t-on-click="update">
  Hello <t t-esc="state.text"/>
</span>
`;

export class MyComponent extends Component {
    static template = MY_COMPONENT_TEMPLATE;
    state = useState({text: 'Owl'});
    update() {
        this.state.text = this.state.text === 'Owl' ? 'World' : 'Owl';
    }
}
