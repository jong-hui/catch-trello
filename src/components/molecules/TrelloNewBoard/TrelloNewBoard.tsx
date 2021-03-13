import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { styleMixins } from '@/styles/mixins/styleMixins';
import OpenColor from 'open-color';
import { BoardModel } from '@/models/trello/BoardModel';
import { TrelloTask, RootWrapper as TrelloTaskRootWrapper } from '../TrelloTask/TrelloTask';
import { TrelloNewTask, RootWrapper as TrelloNewTaskRootWrapper } from '../TrelloNewTask/TrelloNewTask';
import { TrelloStore } from '@/stores/TrelloStore/TrelloStore';

export const RootWrapper = styled.button`
  min-width: 220px;
  height: 100%;
  overflow-y: scroll;
  background-color: ${OpenColor.gray[2]};
  border-radius: 5px;

  font-size: 2rem;
  cursor: pointer;
  ${styleMixins(['centering'])};
`

export interface ITrelloNewBoardProps {
  children?: React.ReactNode
  trelloStore: TrelloStore
}

export const TrelloNewBoard = observer(function TrelloNewBoard({
  children,
  trelloStore
}: ITrelloNewBoardProps) {

  const handleClick = () => {
    const newBoardTitle = window.prompt()

    if (newBoardTitle) {
      trelloStore.addBoard({
        title: newBoardTitle
      })
    }
  }

  return (
    <RootWrapper
      onClick={handleClick}
    >
      +
    </RootWrapper>
  )
})