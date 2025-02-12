import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import uniqid from "uniqid"

import todos from "reducers/todos";
import EmptyPic from "./EmptyPic";
import { format } from "date-fns";

const AddContainer = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0;
  p {
    margin: 0;
  }
`

const Button = styled.button`
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 50px;
  position: absolute;
  left: 20px;
  top: 4px;
  border-radius: 50%;
  background-color: transparent;
  color: var(--misty);
  display: flex;
`

const Circle = styled.div `
  height: 70px;
  width: 70px;
  background-color: var(--darkblgr);
  border-radius: 50%;
  position: absolute;
  top: -20px;
`

const AddBox = styled.article`
  form {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    margin-top:40px;
    width: 360px;

    @media (min-width: 768px) {
      width: 400px;
    }
  }

  .send {
    background-color: var(--darkblgr);
    cursor: pointer;
    border: none;
    padding: 10px;
    border-radius: 0 5px 5px 0;
    color: var(--ltgrey);
    font-size: 20px;
  }

  input {
    background-color: var(--misty);
    font-size: 20px;
    border-radius: 5px 0 0 5px;
    border: none;
    padding: 10px;
    width: 100%;
  }
`

const AddTodo = () => {

  const dispatch = useDispatch()
  const [newItem, setNewItem] = useState('')
  const [visible, setVisible] = useState(false)
  const todoList = useSelector((store) => store.todos.items)
    
  const handleSubmit =  (event) => {
    event.preventDefault();
    dispatch(todos.actions.addTask(newTask));
      setNewItem('')
      setVisible(false)
  }

  const newTask = {
    id: uniqid(),
    listitem: newItem,
    isDone: false,
    createdAt: format(new Date(), 'LLLL d, yyyy | HH:mm')
  }

  return (
    <AddContainer>
      <Circle>
        <Button
          type="button"
          className="add"
          onClick={() => setVisible(!visible)}>+
        </Button>
      </Circle>
        {visible && (
          <AddBox>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="My new todo"
                maxLength="26"
                onChange={(event) => setNewItem(event.target.value)}
                value={newItem}
              />
              <button 
                className="send" 
                type="submit"
                disabled={newItem === ""}>
                  <p>Add</p> 
              </button>
            </form>
          </AddBox>
        )}
        {!visible && todoList.length === 0 && (
          <EmptyPic /> )
        }
      </AddContainer>
    )
}

export default AddTodo