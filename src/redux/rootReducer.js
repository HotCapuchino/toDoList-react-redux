import {toDosReducer} from './reducers/toDosReducer.js';
import {filterReducer} from './reducers/filtersReducer.js';
import {editingReducer} from './reducers/editingReducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    toDos: toDosReducer,
    editingToDo: editingReducer,
    filter: filterReducer,
});

export default rootReducer;