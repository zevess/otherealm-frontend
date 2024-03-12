import { Box } from "@mui/material"
import { ProfileName } from "./ProfileName"
import { ListWindow } from "./ListWindow"
import { FranchiseList } from "./FranchiseList"
import { SectionToggleGroup } from "../Toggles/SectionToggleGroup"
import React from "react"
import { divideItems, itemTypes, searchToggleItems, sections } from "../../utils/itemTypes"
import { handleChange } from "../../utils/handleChange"
import { SearchToggleGroup } from "../Toggles/SearchToggleGroup"
import { useAppSelector } from "../../store"
import DisabledPortalPopup, { PopupWithTrigger } from "../Popup"

export const Profile = () => {

  const [section, setSection] = React.useState(Object.keys(sections)[0]);
  const [type, setType] = React.useState(Object.keys(itemTypes)[0]);
  const [divide, setDivide] = React.useState(Object.keys(divideItems)[0]);
  console.log(section, type, divide)

  const nameSelector = String(useAppSelector((state) => state.authData.data?.name));

  return (
    <>
      <ProfileName name={nameSelector} />
      <Box display={"flex"} justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} marginRight={'20px'}>
          <SectionToggleGroup items={sections} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setSection)} alignment={section}></SectionToggleGroup>
        </Box>
        {section == 'list' ? <ListWindow type={type} setType={setType} divide={divide} setDivide={setDivide} /> : <FranchiseList />}
      </Box>
    </>
  )
}
