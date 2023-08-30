import React from "react";
import styled, {createGlobalStyle} from 'styled-components'
import WorkExperience from "./components/WorkExperience"
import Header from "./components/Header"
import Publications from "./components/Publications";
import { Analytics } from '@vercel/analytics/react';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    @media (prefers-color-scheme: dark) {
      background: black;

      text,h1,h2,h3,h4,h5,h6 {
        color: white;
      }

      a {
        color: dodgerblue;
      }
    }
  }
`;

const Container = styled.main` 
  display: flex;
  flex-direction: column;
  margin-right: 4vh;
  margin-left: 4vh;
`;

const Subtitle = styled.h3`
  margin: 0;
  font-size: calc(14px + 1vw);
  font-weight: 400;
`;

const Description = styled.h5`
  font-size: calc(10px + 1vw);
  font-weight: 300;
  color: grey;
  width: 60%;
`

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
    <div className="App">
      <GlobalStyles />
      <Container>
        <Header/>
        <SubContainer>
          <Subtitle>Frontend Developer</Subtitle>
          <LinksContainer>
            <a href="https://github.com/avoocado-dev" target="_blank" rel="noreferrer">
              <img src="./github.png" width="40" height="40" aria-label="github icon"></img>
            </a>
            <a href="https://www.linkedin.com/in/antonio-aguilar-gomez-14742a105/" target="_blank" rel="noreferrer">
              <img src="./linkedin.png" width="40" height="40" aria-label="linkedin icon"></img>
            </a>
          </LinksContainer>
        </SubContainer>
        <Description>I'm a software engineer with a focus on front end development. My development experience ranges from Microsoft to web3 startups. Published leader in advocacy work. No visa sponsorship required.</Description>
        <WorkExperience/>
        <Publications/>
      </Container>
      <Analytics />
    </div>
  )
}