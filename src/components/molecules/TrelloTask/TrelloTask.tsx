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
  align-self: center;
`

const TaskTitle = styled.p`
  flex-grow: 1;
  text-align: center;
  align-self: center;
  padding: 0 0.5rem;
  max-width: 100%;
  word-break: break-all;
`

export interface ITrelloTaskProps {
  children?: React.ReactNode
  task: TaskModel
}

export const TrelloTask = observer(function TrelloTask({
  children,
  task
}: ITrelloTaskProps) {
  const [isEditable, setIsEditable] = React.useState(false)

  const handleMovePrev = () => {
    if (!task.board?.isFirstBoard && task.board?.prevBoard) {
      task.changeBoard(task.board?.prevBoard.id)
    }
  }

  const handleMoveNext = () => {
    if (!task.board?.isLastBoard && task.board?.nextBoard) {
      task.changeBoard(task.board?.nextBoard.id)
    }
  }

  const toggleEditable = () => {
    setIsEditable(_isEditable => !_isEditable)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    task.changeTitle(e.target.value)
    setIsEditable(false)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value

    // Enter
    if (e.keyCode === 13) {
      task.changeTitle(value)
      setIsEditable(false)
    }
  }

  return (
    <RootWrapper>
      {isEditable ? (
        <>
          <input
            type="text"
            autoFocus
            defaultValue={task.title}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
        </>
      ) : (
        <>
          {!task.board?.isFirstBoard ? (
            <BoardChangeArrow
              onClick={handleMovePrev}
            >
              &lt;
            </BoardChangeArrow>
          ) : null}
          <TaskTitle
            onClick={toggleEditable}
          >
            {task.title}
          </TaskTitle>
          {!task.board?.isLastBoard ? (
            <BoardChangeArrow
              onClick={handleMoveNext}
            >
              &gt;
            </BoardChangeArrow>
          ) : null}
        </>
      )}
    </RootWrapper>
  )
})