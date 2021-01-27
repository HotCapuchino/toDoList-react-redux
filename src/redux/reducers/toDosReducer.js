import initialState from '../initialState.js';
import * as actionTypes from '../actions/actionTypes';

function toDosReducer(state = initialState.toDos, action) {
    switch (action.type) {
        // adding ToDo
        case actionTypes.ACTION_ADD_TO_DO: {
            return [
                ...state,
                {
                    id: state.length + 1,
                    description: action.payload.description,
                    priority: action.payload.priority,
                    completed: false
                }
            ]
        }
        // deleting ToDo
        case actionTypes.ACTION_DELETE_TO_DO: {
            let newState = [];
            for (const toDo of state) {
                if (toDo.id === action.payload.id) {
                    continue;
                }
                newState.push(toDo);
            }
            return newState;
        }
        // mark ToDo as completed
        case actionTypes.ACTION_COMPLETE_OR_RESUME_TO_DO: {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        completed: !item.completed
                    }
                } else {
                    return item;
                }
            });
        }
        // adding edited ToDo
        case actionTypes.ACTION_ADD_EDITED_TO_DO: {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    console.log('gotcha!');
                    return {
                        ...item,
                        description: action.payload.description,
                        priority: action.payload.priority,
                        completed: false
                    }
                } else {
                    return item;
                }
            });
        }
        // mark all toDos as completed
        case actionTypes.ACTION_COMPLETE_ALL_TO_DOS: {
            return state.map(item => {
                return {
                    ...item,
                    completed: true
                }
            })
        }
        // deleting all completed toDos
        case actionTypes.ACTION_CLEAR_COMPLETED_TO_DOS: {
            let newState = [];
            for (const toDo of state) {
                if (!toDo.completed) {
                    newState.push(toDo);
                }
            }
            return newState;
        }
        default: return state;
    }
}

export { toDosReducer };