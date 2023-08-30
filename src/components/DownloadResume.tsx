import React from "react";
import styled from "styled-components";

const Title = styled.a`
  font-size: calc(12px + 1vw);
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
    <Title href="./Antonio_Aguilar_Resume_2023_c.pdf" download="Antonio_Aguilar_Resume_2023_c.pdf">Resume</Title>
  )
}