import React from "react";
import styled from "styled-components";
import DownloadResume from "./DownloadResume";

const Title = styled.text`
  font-size: 48px;
  font-weight: 800;
`;

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`;

const Subtitle = styled.h3`
  margin: 0;
  font-size: 36px;
  font-weight: 400;
`;

const SubContainer = styled.div`
  display: flex;
`

const LinksContainer = styled.div`
  padding-left: 10px;
`

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Parent = styled.div `
  display: flex;
  margin-top: 4vh;
`

const Selfie = styled.div`
  margin-right: 1vw;
`

export default function Header() {
  return (
    <Parent>
      <Selfie>
        <img src="./selfie.jpg" width="100" height="100" aria-label="github icon"></img>
      </Selfie>
      <Container>
        <RowContainer>
          <Title>Antonio Aguilar Gomez</Title>
          <DownloadResume/>
        </RowContainer>
        <SubContainer>
          <Subtitle>Frontend Developer</Subtitle>
          <LinksContainer>
            <a href="https://github.com/avoocado-dev" target="_blank" rel="noreferrer">
              <img src="./github.png" width="50" height="50" aria-label="github icon"></img>
            </a>
            <a href="https://www.linkedin.com/in/antonio-aguilar-gomez-14742a105/" target="_blank" rel="noreferrer">
              <img src="./linkedin.png" width="50" height="50" aria-label="linkedin icon"></img>
            </a>
          </LinksContainer>
        </SubContainer>
      </Container>
    </Parent>
  )
}