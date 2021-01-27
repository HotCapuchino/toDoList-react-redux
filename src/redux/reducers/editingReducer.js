import initialState from '../initialState.js';
import * as actionTypes from '../actions/actionTypes';

function editingReducer(state = initialState.editingToDo, action) {
    switch(action.type) {
        // starting editing ToDo, filling in its data
        case actionTypes.EDITING_TO_DO_STARTS: {
            return {
                id: action.payload.id,
                description: action.payload.description,
                priority: action.payload.priority
            };
        } 
        // completing editing ToDo, deleting its data
        case actionTypes.EDITING_TO_DO_ENDS: {
            return null;
        }
        default: return state;
    }
}

export { editingReducer };