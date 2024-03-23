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
import { Navigate, useNavigate, useParams } from "react-router-dom"
import axios from '../../axios'
import { fetchUser, setSelectedUserData } from "../../store/auth"
import { ErrorBoundary } from "../ErrorPage"


export const Profile = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const nameSelector = String(useAppSelector((state) => state.authData.selectedUserData?.name));

  const [type, setType] = React.useState(Object.keys(itemTypes)[0]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    dispatch(setCurrentFilterItem(type));
  }, [type])

  axios.get(`/auth/getUser/${params.nick}`).then(res => {
    dispatch(setSelectedUserData(res.data));
  }
  ).catch(err => {
    setError(true)
  })

  if (error) {
    return <Navigate to={'/error'}/>
  }

  return (
    <>
      <ProfileName name={nameSelector} />
      <Box display={"flex"} justifyContent={'center'}>
        <ListWindow type={type} setType={setType} />
      </Box>
    </>
  )
}







{/* <Box display={'flex'} flexDirection={'column'} marginRight={'20px'}>
          <SectionToggleGroup items={sections} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setSection)} alignment={section}></SectionToggleGroup>
        </Box> */}
{/* {section == 'list' ? <ListWindow type={type} setType={setType} /> : <FranchiseList />} */ }