import React from "react";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import axios from '../../axios'
import { setFeed } from "../../store/auth";
import { Post } from "./Post";
import { postProps, userPosts } from "../../store/interfaces";
import { Link } from "react-router-dom";
import { ColorButtonBlue } from "../CustomButton";
import { fetchPostsFeed } from "../../store/posts";
import { CircularProgress, Typography } from "@mui/material";

export const PostsFeed = () => {
    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.authData.selectedUserData?._id));
    const isSameUser = (userId == selectedUserId)
    const feedSelector = useAppSelector((state) => state.postsData.feed);
    console.log(feedSelector);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (userId !== undefined) {
            dispatch(fetchPostsFeed(userId)).catch(err => {
                console.log(err);
            })
        }
    }, [userId]);

    if(feedSelector.status == 'loading'){
        return <CircularProgress />
    }

    if(feedSelector.feedPosts) return (
        <div className="postListWrapper feed">
            {feedSelector.feedPosts.length == 0 ? 
            (
                <Typography variant="h3">не найдены подписки для отображения постов</Typography>
            ) : (
                <div className="postsList"  >
                {feedSelector.feedPosts.map((item: any) => (
                    <Post avatar={item.user.avatarUrl} key={item._id} id={item._id} user={item.user.name} nick={item.user.nick} imageUrl={item.imageUrl} title={item.title} date={item.createdAt} isText={item.text} />
                ))}

            </div>
            )}
            
            <Link to={'/post/add'}>
                <ColorButtonBlue>создать запись</ColorButtonBlue>
            </Link>

        </div>
    )
}