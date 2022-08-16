import { __info__, Component, mount, xml } from './owl.js'
console.log('hello owl', __info__.version)

// Owl Components
class Root extends Component {
    static template = xml`<div>todo app</div>`
}

mount(Root, document.body)
