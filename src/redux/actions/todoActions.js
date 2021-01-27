import * as actionTypes from './actionTypes.js';

// done
export const addToDo = (description, priority) => {
    return {
        type: actionTypes.ACTION_ADD_TO_DO,
        payload: {description, priority}
    };
}
// done
export const deleteToDo = (id) => {
    return {
        type: actionTypes.ACTION_DELETE_TO_DO,
        payload: {id}
    }
}
// done
export const addEditedToDo = (id, description, priority) => {
    return {
        type: actionTypes.ACTION_ADD_EDITED_TO_DO,
        payload: {id, description, priority}
    }
}
//done
export const completeOrResumeToDo = (id) => {
    return {
        type: actionTypes.ACTION_COMPLETE_OR_RESUME_TO_DO,
        payload: {id}  
    }
}
// done
export const completeAllToDos = () => {
    return {
        type: actionTypes.ACTION_COMPLETE_ALL_TO_DOS,
    }
}
// done
export const clearCompletedToDos = () => {
    return {
        type: actionTypes.ACTION_CLEAR_COMPLETED_TO_DOS,
    }
}
// done
export const startEditing = (id, description, priority) => {
    return {
        type: actionTypes.EDITING_TO_DO_STARTS,
        payload: {id, description, priority}
    }
}
// done
export const endEditing = () => {
    return {
        type: actionTypes.EDITING_TO_DO_ENDS,
    }
}