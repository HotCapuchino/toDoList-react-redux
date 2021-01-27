import mainPageStyle from './App.module.css';
import ToDoItem from './components/ToDoItem';
import ToDoCreator from './components/ToDoCreator';
import ToDoController from './components/ToDoController';
import * as actionTypes from './redux/actions/actionTypes';
import { useSelector } from 'react-redux';
import store from './redux/store';

store.dispatch({ type: actionTypes.ACTION_ADD_TO_DO, payload: { description: "ha", priority: true } });

function App(props) {
  const selectToDos = state => state.toDos;
  const selectFilter = state => state.filter;
  const toDos = useSelector(selectToDos);
  const filter = useSelector(selectFilter);
  const filterNames = ["Все", "Завершенные", "Незавершенные", "Приоритетные"];
  const filterTypes = ["all", "completed", "incompleted", "priority"];

  return (
    <div className={mainPageStyle.generalWrapper}>
      <div className={mainPageStyle.toDoWrapper}>
        <ToDoCreator />
        <div className={mainPageStyle.toDoItemsArea}>
          {renderToDos(toDos, filter)}
        </div>
        <ToDoController filterNames={filterNames} filterTypes={filterTypes}/>
      </div>
    </div>
  );
}

// rendering ToDo list, based on filterType
function renderToDos(toDos, filter) {
  let toDosList = null;
  switch(filter) {
    case "all": {
      toDosList = toDos.map(item => {
        return <ToDoItem description={item.description} priority={item.priority} completed={item.completed} key={item.id} id={item.id}/>
      });
    }
    break;
    case "completed": {
      toDosList = toDos.map(item => {
        if (item.completed) {
          return <ToDoItem description={item.description} priority={item.priority} completed={item.completed} key={item.id} id={item.id}/>
        } 
        return null;
      });
    }
    break;
    case "incompleted": {
      toDosList = toDos.map(item => {
        if (!item.completed) {
          return <ToDoItem description={item.description} priority={item.priority} completed={item.completed} key={item.id} id={item.id}/>
        } 
        return null;
      });
    }
    break;
    case "priority": {
      toDosList = toDos.map(item => {
        if (item.priority) {
          return <ToDoItem description={item.description} priority={item.priority} completed={item.completed} key={item.id} id={item.id}/>
        } 
        return null;
      });
    }
    break;
    default: break;
  }
  return toDosList;
}

export default App;
