import { SET_TODO, ADD_TODO, DELETE_TODO, CHANGE_TODO } from "./constants";

const initState = {
    todos: [],
    todoInput: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case SET_TODO: 
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_TODO: 
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            const newTodos = [...state.todos]
            newTodos.splice(action.payload, 1)

            return {
                ...state,
                todos: newTodos
            }
        case CHANGE_TODO: 
            const todosChanged = [...state.todos]
            todosChanged.splice(action.payload.selected, 1 , action.payload.todoInput)
            return {
                ...state,
                todos: todosChanged
            }
        default:
            throw new Error('Invalid Action')
    }
}

export {initState}
export default reducer