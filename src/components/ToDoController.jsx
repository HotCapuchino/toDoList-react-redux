import React from 'react';
import toDoControllerStyles from './ToDoController.module.css';
import { connect } from 'react-redux';
import { clearCompletedToDos, completeAllToDos } from '../redux/actions/todoActions';
import { showAll, showCompleted, showIncompleted, showPriority } from '../redux/actions/filterActions';


class ToDoController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalAmount: this.props.toDos.length,
            filterType: this.props.filter,
            filterButtons: this.buildFilterButtons()
        } 
        this.actionHandler = this.actionHandler.bind(this);
        this.buildFilterButtons = this.buildFilterButtons.bind(this);
    }

    // handle action buttons, checking if there's any toDos
    actionHandler(type) {
        if (type === "clear" && this.state.totalAmount) {
            this.props.ACTION_clearCompleted();
        } else if (type === "complete" && this.state.totalAmount) {
            this.props.ACTION_completeAll();
        }
    }

    // checking if the filterType was changed
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.state.filterType) {
            this.setState({
                filterType: nextProps.filter,
                filterButtons: this.buildFilterButtons()
            }, console.log(this.state.filterButtons));
        }
    }

    buildFilterButtons() {
        let filterButtons = [];
        let activeFilter = "";
        for (let i = 0; i < this.props.filterTypes.length; i++) {
            if (this.props.filterTypes[i] === this.props.filter) {
                activeFilter = toDoControllerStyles.filtersWrapper__activeFilter;
            }
            filterButtons.push(<div className={`${toDoControllerStyles.filtersWrapper__filterType} ${activeFilter}`}
                onClick={() => {this.props.FILTER_filterActionController(this.props.filterTypes[i])}} key={this.props.filterTypes[i]}>{this.props.filterNames[i]}</div>);
            activeFilter = "";
        }
        return filterButtons;
    }

    render() {
        return(
            <div className={toDoControllerStyles.toDoControllerWrapper}>
                <div className={toDoControllerStyles.actionsWrapper}>
                    <div className={toDoControllerStyles.actionsWrapper__actionTitle}>Действия:</div>
                    <button className={`${toDoControllerStyles.actionsWrapper__actionButton} 
                    ${toDoControllerStyles.actionsWrapper__completeAll}`} onClick={() => {this.actionHandler("complete")}}>Пометить все как завершенные</button>
                    <button className={`${toDoControllerStyles.actionsWrapper__actionButton} 
                    ${toDoControllerStyles.actionsWrapper__clearCompleted}`} onClick={() => {this.actionHandler("clear")}}>Очистить завершенные</button>
                </div>
                <div className={toDoControllerStyles.filtersWrapper}>
                    <div className={toDoControllerStyles.filtersWrapper__filterTitle}>Фильтры:</div>
                    {this.state.filterButtons}
                    {/* <div className={toDoControllerStyles.filtersWrapper__filterType} name="all" onClick={() => {this.props.FILTER_filterActionController("all")}}>Все</div>
                    <div className={toDoControllerStyles.filtersWrapper__filterType} name="completed" onClick={() => {this.props.FILTER_filterActionController("completed")}}>Завершенные</div>
                    <div className={toDoControllerStyles.filtersWrapper__filterType} name="incompleted" onClick={() => {this.props.FILTER_filterActionController("incompleted")}}>Незавершенные</div>
                    <div className={toDoControllerStyles.filtersWrapper__filterType} name="priority" onClick={() => {this.props.FILTER_filterActionController("priority")}}>Приоритетные</div> */}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { toDos } = state;
    const { filter } = state;
    return { toDos, filter };
}

// this function is for injecting particular actions with store this component needs
const mapDispatchToProps = (dispatch) => {
    return {
        ACTION_completeAll: () => {
            dispatch(completeAllToDos());
        },
        ACTION_clearCompleted: () => {
            dispatch(clearCompletedToDos());
        },
        FILTER_filterActionController: (filterType) => {
            switch (filterType) {
                case "all": dispatch(showAll(filterType));
                case "completed": dispatch(showCompleted(filterType));
                case "incompleted": dispatch(showIncompleted(filterType));
                case "priority": dispatch(showPriority(filterType));
                default: break;
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoController);