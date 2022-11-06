import React from 'react'
import { styled } from '@mui/system';

const StyledTitle = styled('h1')({
  fontSize: '32px',
  padding: '10px 0',
  borderBottom: '1px solid #D3D6DA',
  color: '#333',
  width: '100%',
  margin: '0px'
})

interface Props {
  title: string
}

const Title: React.FC<Props> = ({ title }) => (
  <StyledTitle>{title}</StyledTitle>
)

export default Title