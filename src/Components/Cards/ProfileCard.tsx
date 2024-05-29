import { Avatar, Box, Button, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"
import { process } from "../../axios"


interface ProfileCardProps {
    name: string,
    avatarUrl?: string,
    nick: string,
}

export const ProfileCard: FC<ProfileCardProps> = ({name, avatarUrl, nick}) => {
    return (
        <div className="profileCard">
            <Avatar className="commentUser__info-avatar" src={`${process.env.REACT_APP_API_URL}${avatarUrl}`}></Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <p className="profileCard__name">{name}</p>

                <Link to={`/profile/${nick}`}>
                    <Button className="profileCard__button">перейти в профиль</Button>
                </Link>
            </Box>
        </div>
    )
}