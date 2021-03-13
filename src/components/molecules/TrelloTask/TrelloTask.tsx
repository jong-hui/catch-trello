import React from 'react'
import { observer } from "mobx-react";
import styled from 'styled-components';
import { useStores } from '@/stores';
import { TaskModel } from '@/models/trello/TaskModel';
import OpenColor from 'open-color';

export const RootWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  background-color: ${OpenColor.white};
`

const TaskTitle = styled.p`
  
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

  return (
    <RootWrapper>
      <TaskTitle>
        {task.title}
      </TaskTitle>
    </RootWrapper>
  )
})