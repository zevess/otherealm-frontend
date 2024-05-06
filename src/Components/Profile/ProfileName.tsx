import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import React, { FC } from "react"
import axios from '../../axios'
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useParams } from "react-router-dom"
import { setSelectedUserData } from "../../store/auth"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ColorButtonBlue } from "../CustomButton"

interface ProfileNameProps {
    name: string
}

export const ProfileName: FC<ProfileNameProps> = ({ name }) => {

    const params = useParams()
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.authData.data);
    const avatar = useAppSelector((state) => state.authData.selectedUserData?.avatarUrl);
    const background = useAppSelector((state) => state.authData.selectedUserData?.backgroundUrl);

    const inputAvatarRef = React.useRef<any>(null)
    const inputBGRef = React.useRef<any>(null)
    const [avatarUrl, setImageUrl] = React.useState('')

    const handleChangeAvatar = async (event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        console.log(file)

        formData.append('image', file);
        const { data } = await axios.post('/upload', formData)
        setImageUrl(data.url);
        const fields = {
            "avatarUrl": `${encodeURI(data.url)}`
        }
        axios.patch(`/profile/avatar/${userData?._id}`, fields).then(() => axios.get(`/auth/getUser/${params.nick}`).then(res => {
            dispatch(setSelectedUserData(res.data));
        }))
    }

    const handleChangeBG = async (event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        console.log(file)

        formData.append('image', file);
        const { data } = await axios.post('/upload', formData)
        const fields = {
            "backgroundUrl": `${encodeURI(data.url)}`
        }
        axios.patch(`/profile/background/${userData?._id}`, fields).then(() => axios.get(`/auth/getUser/${params.nick}`).then(res => {
            dispatch(setSelectedUserData(res.data));
        }))
    }

    const [isHovered, setIsHovered] = React.useState(false)


    const userFollows = (useAppSelector((state) => state.authData.data?.follows));
    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUser = (useAppSelector((state) => state.authData.selectedUserData));

    const isSameUser = (userId == selectedUser?._id)

    const isFollowed = selectedUser?._id !== undefined && userFollows?.includes(selectedUser._id)
    
    const userToFollowId = (useAppSelector((state) => state.authData.selectedUserData?._id));

    const [follow, setFollow] = React.useState(isFollowed);


    React.useEffect(() =>{
        setFollow(isFollowed);
    }, [isFollowed])

    console.log(isFollowed)
    const handleFollow = async () => {
        try {

            const fields = {
                userId,
                userToFollowId
            }

            await axios.patch('/profile/follow', fields).then(
                () => setFollow(true)
            )

        } catch (err) {
            console.warn(err);
            alert("ошибка при подписке")
        }

    }

    const handleUnfollow = async () => {
        try {

            const fields = {
                userId,
                userToFollowId
            }
            if (window.confirm('вы уверены что хотите отписаться')) {
                await axios.patch('/profile/unfollow', fields).then(
                    () => setFollow(false)
                )
            }

        } catch (err) {
            console.warn(err);
            alert("ошибка при подписке")
        }
    }

    return (
        <div className="profileHeadWrapper">

            <Box className="profileHead" sx={{ backgroundImage: `url(http://localhost:4444${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {isSameUser &&
                    <>
                        <input accept="image/*" ref={inputBGRef} type="file" onChange={handleChangeBG} hidden />
                        <IconButton onClick={() => inputBGRef.current.click()} style={{ visibility: isHovered ? 'visible' : 'hidden', display: 'flex', borderRadius: '8px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} className="editProfileBG">
                            <EditOutlinedIcon sx={{ color: 'white' }} />
                            <Typography variant="body2" color={'white'}>изменить обложку</Typography>
                        </IconButton>
                    </>}

            </Box>

            <div className="profileHead__user">
                <Box sx={{ display: 'flex' }}>
                    {isSameUser ?
                        <>
                            <input accept="image/*" ref={inputAvatarRef} type="file" onChange={handleChangeAvatar} hidden />
                            <IconButton onClick={() => inputAvatarRef.current.click()}>
                                <Avatar src={`http://localhost:4444${avatar}`} className="profileHead__user-avatar" />
                            </IconButton>
                        </> : <Avatar src={`http://localhost:4444${avatar}`} className="profileHead__user-avatar" />}

                    <p className="profileHead__user-name">{name}</p>
                </Box>
                <hr style={{ borderTop: '6px solid black', width: 'auto' }}></hr>
            </div>

            {!isSameUser && <div className="profileHead__follow">
                <ColorButtonBlue sx={{marginLeft: 'auto'}} onClick={follow ? handleUnfollow : handleFollow}>
                    {follow ? "отписаться" : "подписаться"}
                </ColorButtonBlue>
            </div>}

        </div>

    )
}