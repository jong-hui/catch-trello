import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { TrelloBoard, RootWrapper as TrelloBoardRootWrapper } from '@/components/molecules/TrelloBoard/TrelloBoard';
import { styleMixins } from '@/styles/mixins/styleMixins';

const RootWrapper = styled.div`
  ${styleMixins(['centering'])};
  width: 100vw;
  height: 100vh;
`

const TrelloBoardWrapper = styled.div`
  ${styleMixins(['flexRow'])};
  width: calc(100% - 80px);
  height: 400px;
  overflow-x: scroll;

  margin: -10px;
  & > ${TrelloBoardRootWrapper} {
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
        {trelloStore.boards.map(board => (
          <TrelloBoard
            board={board}
          />
        ))}
      </TrelloBoardWrapper>
    </RootWrapper>
  )
})