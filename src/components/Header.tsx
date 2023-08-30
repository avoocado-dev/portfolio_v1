import React from "react";
import styled from "styled-components";
import DownloadResume from "./DownloadResume";

const Title = styled.text`
  font-size: calc(24px + 1vw);
  font-weight: 800;
`;

const Container = styled.main` 
  margin-top: 4vh;
  display: flex;
  flex-direction: row;
`;

export default function Header() {
  return (
    <Container>
      <Title>Antonio Aguilar Gomez</Title>
      <DownloadResume/>
    </Container>
  )
}