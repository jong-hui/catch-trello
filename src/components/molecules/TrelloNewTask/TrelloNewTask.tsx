import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { BoardModel } from '@/models/trello/BoardModel';
import OpenColor from 'open-color';

export const RootWrapper = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  background-color: ${OpenColor.white};
  cursor: pointer;
`

const NewTaskTitle = styled.p`
  text-align: center;
  font-size: 1.25rem;
`

export interface ITrelloNewTaskProps {
  children?: React.ReactNode
  board: BoardModel
}

export const TrelloNewTask = observer(function TrelloNewTask({
  children,
  board
}: ITrelloNewTaskProps) {

  const handleClick = () => {
    const newTaskTitle = window.prompt('input your task title')
    
    if (newTaskTitle) {
      board.trelloStore.addTask({
        title: newTaskTitle,
        boardId: board.id
      })
    }
  }

  return (
    <RootWrapper
      onClick={handleClick}
    >
      <NewTaskTitle>
        +
      </NewTaskTitle>
    </RootWrapper>
  )
})