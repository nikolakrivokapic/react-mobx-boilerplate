import { computed, observable } from "mobx"

class Todo {
    @observable value;
    @observable id;
    @observable selected;

    constructor(value) {
        this.value = value;
        this.id = Date.now();
        this.selected = false
    }
}

export class TodoStore {
    @observable todos = [];
    @observable filter = "";
    @computed get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, "i");
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value));
    }

    @computed get hasSelected() {
        return this.todos.filter(todo => todo.selected).length > 0;
    }

    createTodo(value) {
        this.todos.push(new Todo(value))
    }

    clearComplete = () => {
        const unselectedTodos = this.todos.filter(todo => !todo.selected);
        this.todos.replace(unselectedTodos);
    }
}

export default new TodoStore

