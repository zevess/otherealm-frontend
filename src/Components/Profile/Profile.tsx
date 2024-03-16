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
import { useAppDispatch } from "../../store/hooks"
import { setCurrentFilterItem } from "../../store/reducers/stateReducer"
import { useParams } from "react-router-dom"
import axios from '../../axios'
import { fetchUser, setSelectedUserData } from "../../store/auth"

export const Profile = () => {

  const params = useParams();
  console.log(params.nick);
  const nameSelector = String(useAppSelector((state) => state.authData.selectedUserData?.name));

  const dispatch = useAppDispatch();
  const [section, setSection] = React.useState(Object.keys(sections)[0]);
  const [type, setType] = React.useState(Object.keys(itemTypes)[0]);
  console.log(type)

  // dispatch(fetchUser(params.nick));
  axios.get(`/auth/getUser/${params.nick}`).then(res => {
    dispatch(setSelectedUserData(res.data));
  }
  ).catch(err => {
    console.warn(err);
    alert('ошибка при получении пользователя')
  })

  React.useEffect(() => {
    dispatch(setCurrentFilterItem(type));
  }, [type])


  return (
    <>
      <ProfileName name={nameSelector} />
      <Box display={"flex"} justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} marginRight={'20px'}>
          <SectionToggleGroup items={sections} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setSection)} alignment={section}></SectionToggleGroup>
        </Box>
        {/* <ColorToggleButton/> */}
        {section == 'list' ? <ListWindow type={type} setType={setType} /> : <FranchiseList />}
      </Box>
    </>
  )
}
