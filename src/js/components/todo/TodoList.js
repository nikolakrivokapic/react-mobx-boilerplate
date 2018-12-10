import React from "react"
import { observer } from "mobx-react"

@observer
export default class TodoList extends React.Component {
    createNew(e) {
        if (e.which !== 13) {
            return;
        }

        this.props.store.createTodo(e.target.value);
        e.target.value = "";
    }

    filter(e) {
        this.props.store.filter = e.target.value;
    }

    toggleComplete(todo) {
        todo.selected = !todo.selected;
    }

    render() {
        const { clearSelected, filter, filteredTodos, hasSelected } = this.props.store;
        const { todoBgColor } = this.props.appStore;

        const todoList = filteredTodos.map(todo => (
            <li key={todo.id}>
                 <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.selected} checked={todo.selected} />
                 <span>{todo.value}</span>
            </li>
        ));

        return <div style={{background: todoBgColor}}>
            <h1>todos</h1>
            <span>Add new: </span><input className="new" onKeyPress={this.createNew.bind(this)} />
            <span>Filter: </span><input className="filter" value={filter} onChange={this.filter.bind(this)} />
            <ul>{todoList}</ul>
            {hasSelected && (<a href="#" onClick={clearSelected}>Clear Selected</a>)}
        </div>
    }
}
