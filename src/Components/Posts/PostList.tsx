import { Box, Button } from "@mui/material"
import { Post } from "./Post"
import { ColorButtonBlue } from "../CustomButton"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store"
import React from "react"
import axios from '../../axios'
import { useAppDispatch } from "../../store/hooks"
import { setSelectedUserPosts } from "../../store/auth"

export const PostList = () => {

    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.authData.selectedUserData?._id));
    const isNotSameUser = (userId == selectedUserId)
    const postsSelector = useAppSelector((state) => state.authData.userPosts);
    console.log(postsSelector);
    const dispatch = useAppDispatch();

    React.useEffect(() =>{
        axios.get(`/posts/${selectedUserId}`).then(res => {
          dispatch(setSelectedUserPosts(res.data));
          console.log("-");
        }).catch(err =>{
          console.log(err);
        })
      }, []);

    return (
        <div className="postListWrapper">
            <Box display={'flex'} flexDirection={'column'}  >
                {postsSelector !== undefined && postsSelector?.map((item: any) => (
                    <Post avatar={item.user.avatarUrl} id={item._id} user={item.user.name} imageUrl={item.imageUrl} title={item.title} date={item.createdAt} isText={item.text}/>
                ))}

            </Box>
            {isNotSameUser && <Link to={'/post/add'}>
                <ColorButtonBlue>создать запись</ColorButtonBlue>
            </Link>}
            
        </div>
    )
}