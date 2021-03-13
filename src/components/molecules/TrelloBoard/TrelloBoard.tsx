import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { styleMixins } from '@/styles/mixins/styleMixins';
import OpenColor from 'open-color';
import { BoardModel } from '@/models/trello/BoardModel';
import { TrelloTask, RootWrapper as TrelloTaskRootWrapper } from '../TrelloTask/TrelloTask';
import { TrelloNewTask, RootWrapper as TrelloNewTaskRootWrapper } from '../TrelloNewTask/TrelloNewTask';

export const RootWrapper = styled.div`
  min-width: 220px;
  max-width: 200px;
  height: 400px;
  background-color: ${OpenColor.gray[2]};
  border-radius: 5px;
  position: relative;

  ${styleMixins(['flexColumn'])};
`

const BoardTitle = styled.h3`
  font-size: 1.25rem;
  text-align: center;
  padding: 1rem 0;
`

const TaskWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem;
  flex-grow: 1;

  margin: -5px;

  & > ${TrelloNewTaskRootWrapper},
  & > ${TrelloTaskRootWrapper} {
    margin: 5px;
  }
`

const BoardDeleteButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${OpenColor.gray[4]};
  background-color: ${OpenColor.gray[2]};
`

export interface ITrelloBoardProps {
  children?: React.ReactNode
  board: BoardModel
}

export const TrelloBoard = observer(function TrelloBoard({
  children,
  board
}: ITrelloBoardProps) {

  const handleDelete = () => {
    if (window.confirm('Are you sure to delete it?')) {
      board.delete()
    }
  }

  return (
    <RootWrapper>
      <BoardTitle>
        {board.title}
      </BoardTitle>
      <TaskWrapper>
        {board.tasks.map(task => (
          <TrelloTask
            key={task.id}
            task={task}
          />
        ))}
        <TrelloNewTask board={board} />
      </TaskWrapper>
      <BoardDeleteButton
        onClick={handleDelete}
      >
        X
      </BoardDeleteButton>
    </RootWrapper>
  )
})