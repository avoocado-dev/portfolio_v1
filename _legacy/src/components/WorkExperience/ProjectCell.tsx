import React from "react";
import styled from "styled-components";
import { WorkProject }from "../WorkExperience"

const Container = styled.div`
  padding: 20px;
  background-color: rgb(15 23 42);
  border-radius: 25px;
  text-color: white;
  margin-bottom: 20px;
  margin-left: 1vw;
`

const RowContainer = styled.div`
  margin-left: 7px;
  display: flex;
  align-items: center
`
const Name = styled.div`
  padding-left: 8px;
  color: white;
  font-size: 24px;
  font-weight: 400;
`
const TimePeriod = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 400;
  margin-left: auto;
`

const StackItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-right: 7px;
  background-color: #cae327;
  padding: 8px;
  width: fit-content;
  border-radius: 25px;
`

const Description = styled.div`
  color: white;
  margin-left: 7px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Icon = styled.img`
  margin-left: 5px;
  max-width: 16px;
`;


export default function ProjectCell({name, imgSrc, timePeriod, siteLink, description, stackList}: WorkProject) {
  return (
    <Container>
      <RowContainer>
        <img src={imgSrc} width="30" height="30" aria-label="business icon"></img>
        {!siteLink && <Name>{name}</Name>}
        {siteLink && <>
          <a
          rel="noreferrer"
          style={{ textDecoration: "none", display: "flex"}}
          href={siteLink}
          target="_blank"
          >
            <Name>{name}</Name>
            <Icon alt="external link" src="/external-link.svg" />
          </a>
        </>}
        <TimePeriod>{timePeriod}</TimePeriod>
      </RowContainer>
      <Description>{description}</Description>
      <RowContainer>
        {stackList.map(stackItem => {return <StackItem>{stackItem}</StackItem>})}
      </RowContainer>
    </Container>
  )
}