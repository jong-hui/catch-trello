import { Trello } from '@/components/organisms/Trello/Trello'
import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`

`

export default function Home() {
  return (
    <Wrapper>
      <Trello />
    </Wrapper>
  )
}
