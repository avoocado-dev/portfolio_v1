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

const Description = styled.h5`
  font-size: 24px;
  font-weight: 300;
  color: grey;
  max-width: 80%;
  @media screen and (max-width: 930px) {
    max-width: 100%
  }
  margin-top: 2vh;
`

export default function Home() {
  return (
    <div className="App">
      <GlobalStyles />
      <Container>
        <Header/> 
        <Description>I'm a software engineer with a focus on front end development. My development experience ranges from Microsoft to web3 startups. Published leader in advocacy work. No visa sponsorship required.</Description>
        <WorkExperience/>
        <Publications/>
      </Container>
      <Analytics />
    </div>
  )
}