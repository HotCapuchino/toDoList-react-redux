import React from 'react';
import { connect } from 'react-redux';
import { deleteToDo, completeOrResumeToDo, startEditing, endEditing } from '../redux/actions/todoActions';
import toDoItemStyles from './ToDoItem.module.css';


class ToDoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: this.props.targetToDo.description,
            priority: this.props.targetToDo.priority,
            completed: this.props.targetToDo.completed,
            id: this.props.targetToDo.id
        }
        this.handleCompleteOrResumeCheckbox = this.handleCompleteOrResumeCheckbox.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleCompleteOrResumeCheckbox() {
        console.log('checkbox: ', this.state.completed);
        this.setState((prevState) => {
            return {
                completed: !prevState.completed
            }
        }, () => {
            this.props.completeOrResume(this.state.id);
        })
    }

    // middleWare function, it checks whether we delete ToDo, which is being edited right now
    handleDelete() {
        if (this.props.editingToDo.id === this.state.id) {
            this.props.endEdit();
        }   
        this.props.delete(this.state.id);
    }

    // rendering buttons checking if toDoItem is completed or not
    renderButtons() {
        if (!this.state.completed) {
            return (
                <>
                    <div className={`${toDoItemStyles.toDoItemOptionsWrapper__editButton} ${toDoItemStyles.toDoItemOptionsWrapper__button}`}
                    onClick={() => { this.props.startEdit(this.state.id, this.state.description, this.state.priority)}}>Редактировать</div>
                    <div className={`${toDoItemStyles.toDoItemOptionsWrapper__deleteButton} ${toDoItemStyles.toDoItemOptionsWrapper__button}`} 
                    onClick={() => { this.handleDelete()}}>Удалить</div>
                </>);
        } else {
            return(
                <>
                    <div className={`${toDoItemStyles.toDoItemOptionsWrapper__editButtonInActive} ${toDoItemStyles.toDoItemOptionsWrapper__button}`}>Редактировать</div>
                    <div className={`${toDoItemStyles.toDoItemOptionsWrapper__deleteButtonInActive} ${toDoItemStyles.toDoItemOptionsWrapper__button}`}>Удалить</div>
                </>
            );
        }
    }

    // check whether current ToDo was edited, if so - updating the state
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.targetToDo.description !== this.state.description ||
            nextProps.targetToDo.priority !== this.state.priority ||
            nextProps.targetToDo.completed !== this.state.completed) {
                this.setState({
                    description: nextProps.targetToDo.description,
                    priority: nextProps.targetToDo.priority,
                    completed: nextProps.targetToDo.completed
                });
            }
    }

    render() {
        let currentWrapperClass = this.state.completed ? toDoItemStyles.toDoItemWrapperCompleted : toDoItemStyles.toDoItemWrapperIncompleted;
        return(
            <div className={`${toDoItemStyles.toDoItemWrapper} ${currentWrapperClass}`}>
                    {this.state.completed ? <input className={toDoItemStyles.toDoItemWrapper__completed} onChange={this.handleCompleteOrResumeCheckbox} type="checkbox" checked></input> :
                    <input className={toDoItemStyles.toDoItemWrapper__completed} onChange={this.handleCompleteOrResumeCheckbox} type="checkbox"></input>}
                <div className={toDoItemStyles.toDoItemWrapper__description}>{this.state.description}</div>
                    {this.state.priority ? <div className={toDoItemStyles.toDoItemWrapper__priority}>Приоритетная</div> : null}
                <div className={toDoItemStyles.toDoItemOptionsWrapper}>
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}

// seeking for targetToDo
function getToDoByID(toDos, id) {
    for (const toDo of toDos) {
        if(toDo.id == id) return toDo;
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    const { toDos } = state;
    const { id } = ownProps;
    const { editingToDo } = state;
    const targetToDo = getToDoByID(toDos, id);
    return { targetToDo, editingToDo };
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeOrResume: (id) => {
            dispatch(completeOrResumeToDo(id));
        },
        delete: (id) => {
            dispatch(deleteToDo(id));
        }, 
        startEdit: (id, description, priority) => {
            dispatch(startEditing(id, description, priority));
        },
        endEdit: () => {
            dispatch(endEditing());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItem);