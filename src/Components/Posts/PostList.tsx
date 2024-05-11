import { Post } from "./Post"
import { ColorButtonBlue } from "../CustomButton"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store"
import React from "react"
import axios from '../../axios'
import { useAppDispatch } from "../../store/hooks"
import { setSelectedUserPosts } from "../../store/auth"
import { userPosts } from "../../store/interfaces"
import { fetchPosts } from "../../store/posts"
import { Typography } from "@mui/material"

export const PostList = () => {

    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.usersData.currentUser.items?._id));
    const isNotSameUser = (userId == selectedUserId)
    const postsSelector = useAppSelector((state) => state.postsData.userPosts.userPosts);
    // console.log(postsSelector);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        // axios.get(`/posts/${selectedUserId}`).then(res => {
        //   dispatch(setSelectedUserPosts(res.data));
        //   console.log("-");
        dispatch(fetchPosts(`${selectedUserId}`)).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div className="postListWrapper">
            {
                postsSelector.length == 0 ? (
                    <Typography variant="h3">списки не найдены</Typography>
                ) : (
                    <>
                        <div className="postsList">
                            {postsSelector !== undefined && (postsSelector as userPosts[])?.map((item: any) => (
                                <Post key={item._id} avatar={item.user.avatarUrl} id={item._id} nick={item.user.nick} user={item.user.name} imageUrl={item.imageUrl} title={item.title} date={item.createdAt} isText={item.text} />
                            ))}

                        </div>
                        {isNotSameUser && <Link to={'/post/add'}>
                            <ColorButtonBlue>создать запись</ColorButtonBlue>
                        </Link>}
                    </>
                )
            }


        </div>
    )
}