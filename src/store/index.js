import React, {createContext, useReducer } from 'react';

console.log(localStorage.getItem('state'))

const stored_state = localStorage.getItem('state');

const initialState = stored_state && JSON.parse(localStorage.getItem('state')) || {
    todos: [
        "Hello",
    ],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {

    const [state, dispatch] = useReducer((state, { action, data }) => {
        
        let newState;

        switch(action) {
            case 'add': 
                newState = { todos: state.todos.concat([data]) };
                return newState;

            case 'edit': 
                newState = { todos: state.todos.map((todo, index)=>{
                    if (index == data.index) {
                        return data.todo;
                    } else {
                        return todo;
                    }
                }) };
                return newState;                

            case 'remove': 
                newState = { todos: state.todos.filter((todo,index)=>index!=data.index) };
                return newState;        
                
            default:
                throw new Error();
        };

    }, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>;

};

export { store, StateProvider }