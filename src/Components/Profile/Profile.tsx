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
import { ColorButtonBlue } from "../CustomButton"
import { fetchOneUser } from "../../store/users"


export const Profile = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const nameSelector = String(useAppSelector((state) => state.usersData.currentUser.items?.name));

  const [type, setType] = React.useState(Object.keys(itemTypes)[0]);
  const [section, setSection] = React.useState('list')
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    dispatch(setCurrentFilterItem(type));
  }, [type])


  React.useEffect(() => {
    dispatch(fetchOneUser(`${params.nick}`)).catch(err => setError(true))
  
  }, []);

  if (error) {
    return <Navigate to={'/error'} />
  }

  return (
    <div className="profileWrapper">
      <ProfileName name={nameSelector} />
      <div className="profileLists">

        <Box display={'flex'} flexDirection={'column'} marginRight={'20px'} position={'static'}>
          <SectionToggleGroup items={sections} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setSection)} alignment={section}></SectionToggleGroup>
          
        </Box>
        
        {section == 'list' ? <ListWindow type={type} setType={setType} /> : <PostList />}

      </div>
    </div>
  )
}







