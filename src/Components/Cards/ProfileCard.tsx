import { Avatar, Box, Button, Typography } from "@mui/material"
import { ButtonUsage } from "../Button"
import { FC } from "react"
import { Link } from "react-router-dom"

interface ProfileCardProps {
    name: string,
    avatarUrl?: string,
    nick: string,
}

export const ProfileCard: FC<ProfileCardProps> = ({name, avatarUrl, nick}) => {
    return (
        <div className="profileCard">
            <Avatar className="commentUser__info-avatar" src={`http://localhost:4444${avatarUrl}`}></Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h4" sx={{ marginTop: '10%' }}>{name}</Typography>

                <Link to={`/profile/${nick}`}>
                    <Button>перейти в профиль</Button>
                </Link>
            </Box>
        </div>
    )
}