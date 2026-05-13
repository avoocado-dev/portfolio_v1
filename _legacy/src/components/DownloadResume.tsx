import React from "react";
import styled from "styled-components";

const Title = styled.a`
  font-size: 24px;
  font-weight: 400;
  color: #cae327;
  &:hover {
    color: white;  
    transition: 0.2s;
  }
  align-self: center;
  margin-left: auto;
`;

export default function DownloadResume() {
  return (
    <Title href="./antonio_resume.pdf" download="antonio_resume.pdf">Resume</Title>
  )
}