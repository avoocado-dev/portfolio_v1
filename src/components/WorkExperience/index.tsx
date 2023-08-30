import React, {useState} from "react";
import styled from "styled-components";
import DropDownModal from "../DropDownModal";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`

const Title = styled.text`
  font-size: calc(16px + 1vw);
  font-weight: 400;
  color: #cae327;
  &:hover {
    color: white;  
    transition: 0.2s;
  }
`;


const StyledChevronDoubleDownO = styled.i`
  color: #cae327;
  margin-left: 5px;
  margin-top: 4px;
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    border: 2px solid;
    border-radius: 40px;
    width: 22px;
    height: 22px;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    left: 6px;
    top: 3px;
  }
  &::after {
    top: 7px;
  }
`

const StyledChevronDoubleUpO = styled.i`
  color: #cae327;
  margin-left: 5px;
  margin-top: 4px;
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    border: 2px solid;
    border-radius: 40px;
    width: 22px;
    height: 22px;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-top: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    left: 6px;
    bottom: 3px;
  }
  &::after {
    bottom: 7px;
  }
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  &:hover {
    color: white;  
    ${StyledChevronDoubleDownO} {
      color: white;
    }
    ${StyledChevronDoubleUpO} {
      color: white;
    }
    transition: 0.2s;
  }
`

export interface WorkProject {
  name: string;
  imgSrc: string;
  timePeriod?: string;
  siteLink?: string;
  description: string
  stackList: string[];
}

const workProjects: WorkProject[] = [
  {
    name: "Microsoft",
    imgSrc: "./microsoft.png",
    timePeriod: "Aug 2019 - May 2023",
    description: "Delivered high quality, robust production level code for a diverse array of feature crews. Worked with ML engineers, designers, accessiblity testers, and user study groups to deliver industry grade user experiences.",
    stackList: ["React", "Typescript", "CSS", "Rest API"],
  },
  {
    name: "TreasureDAO",
    imgSrc: "./treasure.png",
    timePeriod: "June 2023 - August 2023",
    siteLink: "https://app.treasure.lol/",
    description: "Brought in as a contractor to overhaul the styles, performance, and implement a mobile web version of the site.",
    stackList: ["React", "Typescript", "Tailwind", "Next.js", "Vercel", "GraphQL"],
  },
];

const sideProjects: WorkProject[] = [
  {
    name: "NiftyPrints.io",
    imgSrc: "./niftyprint.png",
    siteLink: "https://twitter.com/niftyprints_",
    description: "Built from the ground up a web3 app for a client's physical NFT printing service.",
    stackList: ["React (Hooks)", "Typescript", "Tailwind", "Next.js", "Vercel",],
  },
  {
    name: "Hack4Impact",
    imgSrc: "./hack4impact.jpeg",
    siteLink: "https://calpoly.hack4impact.org/projects/casa-slo",
    description: "Built a child advocate form tracker for the non profit SLO CASA (Court Appointed Special Advocates).",
    stackList: ["Django", "PostgreSQL", "Heroku"],
  },
];


export default function WorkExperience() {
  const [isOpen, setOpen] = useState(false);
  return (
    <Container>
      <RowContainer onClick={() => setOpen(!isOpen)} >
        <Title>Work Experience</Title>
        {!isOpen && <StyledChevronDoubleDownO/>}
        {isOpen && <StyledChevronDoubleUpO/>}
      </RowContainer>
      <DropDownModal isOpen={isOpen} workProjects={workProjects} sideProjects={sideProjects}/>
    </Container>
  )
}