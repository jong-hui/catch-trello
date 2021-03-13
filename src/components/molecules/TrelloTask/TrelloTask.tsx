import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { TaskModel } from '@/models/trello/TaskModel';
import OpenColor from 'open-color';
import { styleMixins } from '@/styles/mixins/styleMixins';
import { isNullOrUndefined } from 'util';

export const RootWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  background-color: ${OpenColor.white};

  ${styleMixins(['flexRow'])};
`

const BoardChangeArrow = styled.p`
  cursor: pointer;
`

const TaskTitle = styled.p`
  flex-grow: 1;
  text-align: center;
`

export interface ITrelloTaskProps {
  children?: React.ReactNode
  task: TaskModel
}

export const TrelloTask = observer(function TrelloTask({
  children,
  task
}: ITrelloTaskProps) {
  const {} = useStores()
  const isFirstBoard = task.board?.prevBoard === undefined
  const isLastBoard = task.board?.nextBoard === undefined

  const handleMovePrev = () => {
    if (!isFirstBoard && task.board?.prevBoard) {
      task.changeBoard(task.board?.prevBoard.id)
    }
  }

  const handleMoveNext = () => {
    console.log(task.board?.nextBoard)
    if (!isLastBoard && task.board?.nextBoard) {
      task.changeBoard(task.board?.nextBoard.id)
    }
  }
  // const isFirstBoard = task.board?.trelloIndex === 0
  // const isLastBoard = task.board?.trelloIndex === (task.trelloStore.boards.length -1)

  // const handleMoveLeft = () => {
  //   const boardIndex = task.board?.trelloIndex
    
  //   if (!isFirstBoard && boardIndex !== undefined) {
  //     const leftBoard = task.trelloStore.getBoardByIndex(boardIndex - 1)

  //     if (leftBoard) {
  //       task.changeBoard(leftBoard.id)
  //     }
  //   }
  // }

  // const handleMoveRight = () => {
  //   const boardIndex = task.board?.trelloIndex

  //   if (!isLastBoard && boardIndex !== undefined) {
  //     const rightBoard = task.trelloStore.getBoardByIndex(boardIndex + 1)

  //     if (rightBoard) {
  //       task.changeBoard(rightBoard.id)
  //     }
  //   }
  // }

  return (
    <RootWrapper>
      {!isFirstBoard ? (
        <BoardChangeArrow
          onClick={handleMovePrev}
        >
          &lt;
        </BoardChangeArrow>
      ) : null}
      <TaskTitle>
        {task.title}
      </TaskTitle>
      {!isLastBoard ? (
        <BoardChangeArrow
          onClick={handleMoveNext}
        >
          &gt;
        </BoardChangeArrow>
      ) : null}
    </RootWrapper>
  )
})