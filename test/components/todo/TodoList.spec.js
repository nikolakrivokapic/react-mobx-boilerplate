import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";

import TodoList from "../../../src/js/components/todo/TodoList";

Enzyme.configure({ adapter: new Adapter() });

describe("TodoList", function() {
    let store, appStore, createTodoCalled, todoValue;

    beforeEach(() => {
        store = {
            filteredTodos: [
                {value: "todo1", id: 111, selected: false},
                {value: "todo2", id: 222, selected: false},
                {value: "todo3", id: 333, selected: false},
            ],
            todos: [
                {value: "todo1", id: 111, selected: false},
                {value: "todo2", id: 222, selected: false},
                {value: "todo3", id: 333, selected: false},
                {value: "todo4", id: 444, selected: true},
            ],
            filter: "test",
            createTodo: (val) => {
                createTodoCalled = true;
                todoValue = val;
            },
            clearSelected: () => {
                const unselectedTodos = this.todos.filter(todo => !todo.selected);
                this.todos.replace(unselectedTodos);
            }
        };
        appStore = {
            bgColor: '#ffffff'
        };
    });

    it("renders filtered todos", () => {
        const wrapper = shallow(<TodoList store={store} appStore={appStore}/>);

        expect(wrapper.find("li span").at(0).text()).toBe("todo1");
        expect(wrapper.find("li span").at(1).text()).toBe("todo2");
        expect(wrapper.find("li span").at(2).text()).toBe("todo3");
    });

    it("calls createTodo on enter", () => {
        createTodoCalled = false;
        const wrapper = shallow(<TodoList store={store} appStore={appStore}/>);

        wrapper.find("input.new").at(0)
            .simulate("keypress", {which: 13, target: {value: 'newTodo'}});

        expect(createTodoCalled).toBe(true);
    });

    it("updates store filter", function() {
        const wrapper = shallow(<TodoList store={store} appStore={appStore}/>);

        wrapper.find("input.filter").at(0)
            .simulate('change', {target: {value: 'filter'}});

        expect(store.filter).toBe("filter");
    });
});
