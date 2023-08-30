import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`

const Title = styled.text`
  font-size: 14px;
  font-weight: 400;
  color: grey;
  &:hover {
    color: white;  
    transition: 0.2s;
  }
`;

export default function Header() {
  return (
    <Container>
      <Title>🥑avodev.xyz</Title>
    </Container>
  )
}