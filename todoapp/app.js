import {
    __info__,
    Component,
    mount,
    xml,
    useRef,
    onMounted,
    useState,
    reactive,
    useEnv,
} from './owl.js';
console.log('hello owl', __info__.version);

// -------------------------------------------------------------------------
// Task List
// -------------------------------------------------------------------------
class TaskList {
    nextId = 1;
    task_list = [];

    addTask(text) {
        text = text.trim();
        if (text) {
            const task = {
                id: this.nextId++,
                text: text,
                isCompleted: false,
            };
            this.task_list.push(task);
        }
    }

    toggleTask(task) {
        task.isCompleted = !task.isCompleted;
    }

    deleteTask(task) {
        const index = this.task_list.findIndex((t) => t.id === task.id);
        this.task_list.splice(index, 1);
    }
}

function createTaskStore() {
    return reactive(new TaskList());
}

// -------------------------------------------------------------------------
// Task Component
// -------------------------------------------------------------------------
class Task extends Component {
    static template = xml/* xml */ `
    <div
        class="task"
        t-att-class="props.task.isCompleted ? 'done' : ''"
    >
        <input
            type="checkbox"
            t-att-checked="props.task.isCompleted"
            t-on-click="() => store.toggleTask(props.task)"
        />
        <span><t t-esc="props.task.text"/></span>
        <span class="delete" t-on-click="() => store.deleteTask(props.task)">🗑</span>
    </div>`;

    static props = ['task'];

    setup() {
        this.store = useEnv().store;
    }
}

// -------------------------------------------------------------------------
// Root Component
// -------------------------------------------------------------------------
class Root extends Component {
    static template = xml/* xml */ `
    <div class="todo-app">
        <input placeholder="Enter a new task"  t-on-keyup="addTask" t-ref="add-input" />
        <div class="task-list">
            <t t-foreach="store.task_list" t-as="task" t-key="task.id">
                <Task task="task" />
            </t>
        </div>
    </div>`;
    static components = { Task };

    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
            this.store.addTask(ev.target.value);
            ev.target.value = '';
        }
    }

    setup() {
        const inputRef = useRef('add-input');
        onMounted(() => inputRef.el.focus());
        this.store = useState(useEnv().store);
    }
}

// -------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------
const env = {
    store: createTaskStore(),
};
mount(Root, document.body, { dev: true, env });
