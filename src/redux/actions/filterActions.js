import * as actionTypes from './actionTypes.js';

export const showAll = (filterType) => {
    return {
        type: actionTypes.FILTER_SHOW_ALL_TO_DOS,
        payload: {filterType}
    }
}

export const showCompleted = (filterType) => {
    return {
        type: actionTypes.FILTER_SHOW_COMPLETED_TO_DOS,
        payload: {filterType}
    }
}

export const showIncompleted = (filterType) => {
    return {
        type: actionTypes.FILTER_SHOW_INCOMPLETED_TO_DOS,
        payload: {filterType}
    }
}

export const showPriority = (filterType) => {
    return {
        type: actionTypes.FILTER_SHOW_PRIORITY_TO_DOS,
        payload: {filterType}
    }
}

// export const getAvailableFilter = () => {
//     return {
//         type: actionTypes.FETCH_AVAILABLE_FILTERS
//     }
// }

// export const getFiltersNames = () => {
//     return {
//         type: actionTypes.FETCH_FILTERS_NAMES
//     }
// }