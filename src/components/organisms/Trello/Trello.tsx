import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { TrelloBoard, RootWrapper as TrelloBoardRootWrapper } from '@/components/molecules/TrelloBoard/TrelloBoard';
import { TrelloNewBoard, RootWrapper as TrelloNewBoardRootWrapper } from '@/components/molecules/TrelloNewBoard/TrelloNewBoard';
import { styleMixins } from '@/styles/mixins/styleMixins';

const RootWrapper = styled.div`
  ${styleMixins(['centering'])};
  width: 100vw;
  height: 100vh;
`

const TrelloBoardWrapper = styled.div`
  ${styleMixins(['flexRow'])};
  width: calc(100% - 80px);
  overflow-x: scroll;

  margin: -10px;
  & > ${TrelloBoardRootWrapper},
  & > ${TrelloNewBoardRootWrapper} {
    margin: 10px;
  }
`

export interface ITrelloProps {
  children?: React.ReactNode
}

export const Trello = observer(function Trello({
  children
}: ITrelloProps) {
  const { trelloStore } = useStores()

  return (
    <RootWrapper>
      <TrelloBoardWrapper>
        {trelloStore.displayBoard.map(board => (
          <TrelloBoard
            key={board.id}
            board={board}
          />
        ))}
        <TrelloNewBoard
          trelloStore={trelloStore}
        />
      </TrelloBoardWrapper>
    </RootWrapper>
  )
})