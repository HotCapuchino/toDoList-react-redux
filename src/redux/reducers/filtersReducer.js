import * as actionTypes from '../actions/actionTypes.js';
import initialState from '../initialState.js';

function filterReducer(state = initialState.filter, action) {
    switch(action.type) {
        case actionTypes.FILTER_SHOW_ALL_TO_DOS: {
            return action.payload.filterType;
        }
        case actionTypes.FILTER_SHOW_COMPLETED_TO_DOS: {
            return action.payload.filterType;
        }
        case actionTypes.FILTER_SHOW_INCOMPLETED_TO_DOS: {
            return action.payload.filterType;
        }
        case actionTypes.FILTER_SHOW_PRIORITY_TO_DOS: {
            return action.payload.filterType;
        }
        default: return state;
    }
}

export {filterReducer};