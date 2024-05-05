import { Box, Typography } from "@mui/material"
import { DiscussItemTitleCard } from "./DiscussItemTitleCard"
import { Comment } from "../CommentWindow/Comment"
import React from "react"
import { InputText } from "../../InputText"
import axios from '../../../axios'
import { useAppDispatch } from "../../../store/hooks"
import { addDiscuss, clearDiscuss } from "../../../store/discuss"
import { useAppSelector } from "../../../store"
import { CommentSection } from "../CommentWindow/CommentSection"
import { discussProps } from "../../../store/interfaces"

export const discussInputStyles = {
    backgroundColor: 'white', textAlign: 'left', marginBottom: '20px', width: '100%'
}


export const ItemDiscussWindow = () =>{

    const dispatch = useAppDispatch()
    // const discussData: discussProps = useAppSelector((state) => state.discussData.discuss.items);
    const [discussData, setDiscussData] = React.useState<discussProps | null>(null)

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    
    const itemId = parts[parts.length -2];
    const discussId = parts[parts.length - 1];

    console.log(discussId)

    React.useEffect(() => {
        axios.get(`/discuss/${itemId}/${discussId}`).then(res => {
            // dispatch(addDiscuss(res.data));
            // console.log(res.data)
            setDiscussData(res.data)
        })

        return () =>{
            dispatch(clearDiscuss())
        }
    }, [])


    if (discussData) return(
        <div className="discussItem">
            <DiscussItemTitleCard avatar={discussData?.user.avatarUrl} nick={discussData?.user.nick} title={discussData?.title} author={discussData?.user.name}/>
            <hr style={{ borderTop: '6px solid black', width: '90%', marginTop: '50px', marginBottom: '50px' }}></hr>
            <Typography sx={{marginBottom: '200px'}} className="discussText" variant="h4">{discussData.text}</Typography>
            <CommentSection postId={discussId}/>
        </div>        
    )
}