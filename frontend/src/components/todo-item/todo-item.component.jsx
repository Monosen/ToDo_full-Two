import { useState } from 'react';
// Components
import Button from '../UI/button/button.component';

import classes from './todo-item.styles.module.css';

const TodoItem = ({ id, content, onEditHandler, onDeleteHandler }) => {
    // State
    const [showEditForm, setShowEditForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [editContentTwo, setEditContentTwo] = useState('');

    const showEditFormHandler = () => {
        setEditContentTwo(editContent);
        setShowEditForm((prevState) => !prevState);
    };

    const onChangeHandler = (event) => {
        const updatedValue = event.target.value;
        if (updatedValue.length > 0) {
            setShowError(false);
        } else {
            setShowError(true);
        }
        setEditContentTwo(updatedValue);
    };

    const onEditTodoHandler = () => {
        if (!showError) {
            onEditHandler(id, editContentTwo);
            setEditContent(editContentTwo);
            setShowEditForm(false);
        }
    };

    const onDeleteTodoHandler = () => {
        onDeleteHandler(id);
    };

    return (
        <div className={classes.item}>
            {!showEditForm ? (
                <p className={classes.item__description}>{editContent}</p>
            ) : (
                <div className={classes['edit-form']}>
                    <input
                        type="text"
                        onChange={onChangeHandler}
                        value={editContentTwo}
                        placeholder={content}
                        className={classes['edit-form__input']}
                    />

                    <Button
                        label="Edit"
                        type="submit"
                        onClick={onEditTodoHandler}
                    />
                </div>
            )}

            {/* Action Buttons */}
            <div className={classes['action-buttons']}>
                <Button
                    onClick={showEditFormHandler}
                    type="button"
                    label={showEditForm ? 'Cancel' : 'Edit'}
                />
                <Button
                    onClick={onDeleteTodoHandler}
                    type="button"
                    label="Delete"
                />
            </div>
        </div>
    );
};

export default TodoItem;
