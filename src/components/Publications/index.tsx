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


export default function Publications() {
  const [isOpen, setOpen] = useState(false);
  return (
    <Container>
      <RowContainer onClick={() => setOpen(!isOpen)} >
        <Title>Publications</Title>
        {!isOpen && <StyledChevronDoubleDownO/>}
        {isOpen && <StyledChevronDoubleUpO/>}
      </RowContainer>
      <DropDownModal isOpen={isOpen}/>
    </Container>
  )
}