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
  height: 100%;
  overflow-y: scroll;
  background-color: ${OpenColor.gray[2]};
  border-radius: 5px;
`

const BoardTitle = styled.h3`
  font-size: 1.25rem;
  text-align: center;
  padding: 1rem 0;
`

const TaskWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 1rem;

  margin: -5px;

  & > ${TrelloNewTaskRootWrapper},
  & > ${TrelloTaskRootWrapper} {
    margin: 5px;
  }
`

export interface ITrelloBoardProps {
  children?: React.ReactNode
  board: BoardModel
}

export const TrelloBoard = observer(function TrelloBoard({
  children,
  board
}: ITrelloBoardProps) {

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
    </RootWrapper>
  )
})