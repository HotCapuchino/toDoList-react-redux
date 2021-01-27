const initialState = {
    toDos: [],
    editingToDo: null,
    filter: "all",
    filterData: {
        filtersAvailable: ["all, completed, incompleted, priority"],
        filtersNames: ["Все", "Завершенные", "Незавершенные", "Приоритетный"]
    }
}

export default initialState;