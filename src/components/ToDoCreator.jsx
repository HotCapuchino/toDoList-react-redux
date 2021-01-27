import React from 'react';
import { addEditedToDo, addToDo, endEditing } from '../redux/actions/todoActions';
import creatorStyles from './ToDoCreator.module.css';
import { connect } from 'react-redux';


class ToDoCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            priority: false
        };
        
        console.log('inside toDoCreator constructor: ', this.props.editingToDo);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handlePriorityInput = this.handlePriorityInput.bind(this);
        this.handleCreateToDo = this.handleCreateToDo.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
        this.handleAddEdited = this.handleAddEdited.bind(this);
    }

    handleDescriptionInput(event) {
        this.setState({
            desc: event.target.value,
        })
    }

    handlePriorityInput() {
        this.setState((prevState) => {
            return {
                priority: !prevState.priority
            }
        })
    }

    // middleWare function, it clears checkbox and input after new ToDo was added
    handleCreateToDo() {
        this.props.createToDo(this.state.desc, this.state.priority);
        this.setState({
            desc: '',
            priority: false
        })
    }

    // middleWare function, it saves changes editing ToDo
    handleAddEdited() {
        console.log('edited data: ', this.state.desc, this.state.priority);
        if (this.state.desc) {
            this.props.addEdited(this.props.editingToDo.id, this.state.desc, this.state.priority);
            this.props.endEdit();
        }
    }

    renderAddButton() {
        if (this.props.editingToDo) {
            return(
                <>
                    <button className={creatorStyles.toDoCreatorWrapper__addButton} 
                    onClick={() => {this.handleAddEdited()}}>Сохранить</button> 
                </>
            )
        } else {
            return(
                <>  
                    <button className={creatorStyles.toDoCreatorWrapper__addButton} 
                    onClick={() => {this.handleCreateToDo()}}>Добавить</button>
                </>
            );
        }
    }   

    // if component gets new props (editing ToDo data), we should update state
    UNSAFE_componentWillReceiveProps(nextProps) {
        // if editing ToDo is called to be deleted, we should set default state to inputs
        if (!nextProps.editingToDo) {
            this.setState({
                desc: '',
                priority: false
            });
            return;
        }
        // insert editing ToDo data into inputs and state
        if (this.props.editingToDo != nextProps.editingToDo) {
            this.setState({
                desc: nextProps.editingToDo.description,
                priority: nextProps.editingToDo.priority
            })
        }
    }

    render() {
        return (
            <div className={creatorStyles.toDoCreatorWrapper}>
                <div className={creatorStyles.toDoCreatorWrapper__optionsWrapper}>
                    <label className={creatorStyles.toDoLabelWrapper}>
                        <div className={creatorStyles.toDoLabelWrapper__description}>Описание</div>
                        <input type="text" value={this.state.desc} onChange={this.handleDescriptionInput}/>
                    </label>
                    <label className={`${creatorStyles.toDoLabelWrapper} ${creatorStyles.flexWrapper}`}>
                        <div>Приоритет</div>
                        {this.state.priority ? <input type="checkbox" onInput={this.handlePriorityInput} checked/> :
                            <input type="checkbox" onInput={this.handlePriorityInput}/>}
                    </label>
                </div>
                {this.renderAddButton()}
            </div>
        );
    }
}

// this function is for injecting particular actions with store this component needs
const mapDispatchToProps = (dispatch) => {
    return {
        createToDo: (description, priority) => {
            if (description) dispatch(addToDo(description, priority));
        },
        addEdited: (id, description, priority) => {
            if (description) dispatch(addEditedToDo(id, description, priority));
        },
        endEdit: () => {
            dispatch(endEditing());
        }
    }
}

// injecting from store editing ToDo or null if there's no such
const mapStateToProps = (state) => {
    const { editingToDo } = state;
    return { editingToDo };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoCreator);