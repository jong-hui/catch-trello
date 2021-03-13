import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { styleMixins } from '@/styles/mixins/styleMixins';
import OpenColor from 'open-color';
import { BoardModel } from '@/models/trello/BoardModel';

export const RootWrapper = styled.div`
  width: 220px;
  height: 100%;
  overflow-y: scroll;
  background-color: ${OpenColor.gray[2]}
`

const BoardTitle = styled.h3`
  font-size: 1.25rem;
  text-align: center;
  padding: 1rem 0;
`

const TaskWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 2rem;
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
        
      </TaskWrapper>
    </RootWrapper>
  )
})