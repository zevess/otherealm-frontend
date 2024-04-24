import { Box } from "@mui/material"
import { ProfileName } from "./ProfileName"
import { ListWindow } from "./ListWindow"
import { SectionToggleGroup } from "../Toggles/SectionToggleGroup"
import React from "react"
import { divideItems, itemTypes, searchToggleItems, sections } from "../../utils/itemTypes"
import { handleChange } from "../../utils/handleChange"
import { useAppSelector } from "../../store"
import { useAppDispatch } from "../../store/hooks"
import { setCurrentFilterItem } from "../../store/reducers/stateReducer"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import axios from '../../axios'
import { fetchUser, setSelectedUserData, setSelectedUserPosts } from "../../store/auth"
import { PostList } from "../Posts/PostList"


export const Profile = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const userId = String(useAppSelector((state) => state.authData.selectedUserData?._id));

  const nameSelector = String(useAppSelector((state) => state.authData.selectedUserData?.name));

  const [type, setType] = React.useState(Object.keys(itemTypes)[0]);
  const [section, setSection] = React.useState('list')
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    dispatch(setCurrentFilterItem(type));
  }, [type])


  React.useEffect(() => {
    axios.get(`/auth/getUser/${params.nick}`).then(res => {
      dispatch(setSelectedUserData(res.data));
      console.log("+");
    }
    ).catch(err => {
      setError(true)
    })
    

  }, []);

  if (error) {
    return <Navigate to={'/error'} />
  }

  return (
    <>
      <ProfileName name={nameSelector} />
      <Box display={"flex"} justifyContent={'center'}>

        <Box display={'flex'} flexDirection={'column'} marginRight={'20px'} position={'static'}>
          <SectionToggleGroup items={sections} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setSection)} alignment={section}></SectionToggleGroup>
        </Box>
        {section == 'list' ? <ListWindow type={type} setType={setType} /> : <PostList />}

      </Box>
    </>
  )
}







