import React from "react";
import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #cae327;
  align-self: center;
  margin-left: 5px;
`;

const Container = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  animation: ${fadeIn} .5s;
`

const Icon = styled.img`
  margin-left: 5px;
  max-width: 16px;
`;


export default function DisplayPublicationsModal () {
  return (
    <Container>
      <RowContainer>
        <a
          rel="noreferrer"
          style={{ textDecoration: "none", display: "flex" }}
          href="https://blogs.microsoft.com/on-the-issues/2020/06/18/scotus-upholds-daca-dreamers/"
          target="_blank"
        >
          <Title>Microsoft representative at Supreme Court oral arguments for DACA</Title>
          <Icon alt="external link" src="/external-link.svg" />
        </a>
      </RowContainer>
      <img src="./DACA.jpg" width="70%" aria-label="DACA image"></img>
    </Container>
  )
}