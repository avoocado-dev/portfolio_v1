import React from "react";
import styled, {keyframes} from "styled-components";
import { WorkProject } from "../WorkExperience";
import ProjectCell from "../WorkExperience/ProjectCell"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #cae327;
  align-self: center;
  margin-left: 5px;
  margin-bottom: 15px;
`;

const Container = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  animation: ${fadeIn} .5s;
`

interface Props {
  sideProjects: WorkProject[];
  workProjects: WorkProject[];
}

export default function DisplayWorkModal ({sideProjects, workProjects}: Props) {

  return (
    <Container>
        <Title>Industry Experience</Title>
        {workProjects.map(project => {
          return <ProjectCell {...project}/>
        })}
        <Title>Projects</Title>
        {sideProjects.map(project => {
          return <ProjectCell {...project}/>
        })}
      </Container>
  )
}