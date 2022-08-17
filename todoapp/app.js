import {
    __info__,
    Component,
    mount,
    xml,
    useRef,
    onMounted,
    useState,
} from './owl.js'
console.log('hello owl', __info__.version)

// -------------------------------------------------------------------------
// Task Component
// -------------------------------------------------------------------------
class Task extends Component {
    static template = xml/* xml */ `
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
      <input type="checkbox" t-att-checked="props.task.isCompleted"/>
      <span><t t-esc="props.task.text"/></span>
    </div>`
    static props = ['task']
}

// -------------------------------------------------------------------------
// Root Component
// -------------------------------------------------------------------------
class Root extends Component {
    static template = xml/* xml */ `
    <div class="todo-app">
        <input placeholder="Enter a new task"  t-on-keyup="addTask" t-ref="add-input" />
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task" />
            </t>
        </div>
    </div>`
    static components = { Task }

    nextId = 1
    tasks = useState([])

    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
            const text = ev.target.value.trim()
            ev.target.value = ''
            if (text) {
                const newTask = {
                    id: this.nextId++,
                    text: text,
                    isCompleted: false,
                }
                this.tasks.push(newTask)
            }
        }
    }

    setup() {
        const inputRef = useRef('add-input')
        onMounted(() => inputRef.el.focus())
    }
}

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------
mount(Root, document.body, { dev: true })
