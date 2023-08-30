import React from "react";
import { WorkProject } from "../WorkExperience";
import DisplayPublicationsModal from "./DisplayPublicationsModal";
import DisplayWorkModal from "./DisplayWorkModal";

interface Props {
  isOpen: boolean;
  sideProjects?: WorkProject[];
  workProjects?: WorkProject[];
}

export default function DropDownModal({isOpen, sideProjects, workProjects}: Props) {
  if(isOpen)
  {
    return (sideProjects && workProjects ? <DisplayWorkModal sideProjects={sideProjects} workProjects={workProjects}/> : <DisplayPublicationsModal/>)
  }
  return <></>
}