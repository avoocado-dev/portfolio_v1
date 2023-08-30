"use client"
import styled from 'styled-components'
import Header from "./components/Header"
import Footer from "./components/Footer"

const Container = styled.main` 
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 5vh;
  magrin-right: 4vh;
  margin-left: 4vh;
`;

const Title = styled.text`
  margin-top: 4vh;
  font-size: calc(24px + 3vw);
  font-weight: 800;
`;

const Subtitle = styled.h3`
  margin: 0;
  font-size: calc(18px + 1vw);
  font-weight: 400;

  @media screen and (max-width: 735px) {
    font-weight: 300;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const LinksContainer = styled.div`
  padding-left: 10px;
  display: flex;
`

export default function Home() {
  return (
    <Container>
      <Header/>
      <Title>Antonio Aguilar Gomez</Title>
      <SubContainer>
        <Subtitle>Frontend Developer</Subtitle>
        <LinksContainer>
          <a href="https://github.com/avoocado-dev" target="_blank">
            <img src="./github.png" width="50" height="50"></img>
          </a>
          <a href="https://www.linkedin.com/in/antonio-aguilar-gomez-14742a105/" target="_blank">
            <img src="./linkedin.png" width="50" height="50"></img>
          </a>
        </LinksContainer>
      </SubContainer>
      <Footer/>
    </Container>
  )
}