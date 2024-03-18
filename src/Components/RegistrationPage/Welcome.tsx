import { Box, Button, CardMedia, Paper, Typography } from "@mui/material"
import { ColorButton, ColorButtonBlue } from "../CustomButton"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store";
// import { About } from "./About"

export const Welcome = () => {

    const selectIsAuth = useAppSelector((state) => state.authData.data);

    return (
        <Box>
            <Paper elevation={3} sx={{ width: '50%', padding: '12px', border: ' solid 2px black ', borderRadius: '40px', backgroundColor: 'white' }}>
                <Typography variant="h2">
                    добро пожаловать на OTHEREALM
                </Typography>
                <Typography variant="h6"> - ваш уникальный портал в мир медиа-франшиз! Здесь вы сможете найти все, что связано с вашими любимыми фильмами, играми, книгами и многим другим.</Typography>
            </Paper>

            <Box marginBottom={'80px'} marginTop={'78px'} display={'flex'} alignItems={'center'} marginLeft={'auto'} marginRight={'auto'} sx={{ maxWidth: '630px' }}>
                <Paper style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} elevation={3}>
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        OTHEREALM предлагает уникальную возможность ознакомиться с информацией о различных объектах медиа-франшиз, оставлять свои комментарии, создавать обсуждения, а также добавлять их в свой профиль для создания персональных коллекций.
                    </Typography>
                </Paper>
            </Box>
            <Typography variant="h2">Среди возможностей есть: </Typography>

            <Box marginTop={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginLeft={'auto'} marginRight={'auto'} width={'100%'}>
                <CardMedia sx={{ border: 'solid 1.5px #646cff', borderRadius: '16px', maxWidth: '44%' }} component={'video'} muted autoPlay loop image={'../src/assets/video/preview.mp4'} />
                <Box width={"30%"} bgcolor={'white'} style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} >
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        поиск по объектам медиа-франшиз
                    </Typography>
                </Box>
            </Box>

            <Box marginTop={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginLeft={'auto'} marginRight={'auto'} width={'100%'}>

                <Box width={"30%"} bgcolor={'white'} style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} >
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        создание коллекций в профиле
                    </Typography>
                </Box>

                <CardMedia sx={{ border: 'solid 1.5px #646cff', borderRadius: '16px', maxWidth: '44%' }} component={'video'} muted autoPlay loop image={'../src/assets/video/section.mp4'} />


            </Box>

            <Box marginTop={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginLeft={'auto'} marginRight={'auto'} width={'100%'}>
                <CardMedia sx={{ border: 'solid 1.5px #646cff', borderRadius: '16px', maxWidth: '44%' }} component={'video'} muted autoPlay loop image={'../src/assets/video/favourite.mp4'} />
                <Box width={"30%"} bgcolor={'white'} style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} >
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        добавление объекта медиа-франшизы в коллекции
                    </Typography>
                </Box>
            </Box>

            <Box marginTop={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginLeft={'auto'} marginRight={'auto'} width={'100%'}>

                <Box width={"30%"} bgcolor={'white'} style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} >
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        оставление комментариев под страницами объектов медиа-франшиз
                    </Typography>
                </Box>

                <CardMedia sx={{ border: 'solid 1.5px #646cff', borderRadius: '16px', maxWidth: '44%' }} component={'video'} muted autoPlay loop image={'../src/assets/video/comment.mp4'} />


            </Box>

            <Box marginTop={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginLeft={'auto'} marginRight={'auto'} width={'100%'}>
                <CardMedia sx={{ border: 'solid 1.5px #646cff', borderRadius: '16px', maxWidth: '44%' }} component={'video'} muted autoPlay loop image={'../src/assets/video/discuss.mp4'} />
                <Box width={"30%"} bgcolor={'white'} style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} >
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        создание обсуждений по объекту медиа-франшиз
                    </Typography>
                </Box>
            </Box>

            <Box marginTop={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} marginLeft={'auto'} marginRight={'auto'} width={'100%'}>

                <Box width={"30%"} bgcolor={'white'} style={{ borderRadius: '30px', border: 'solid 3px', borderColor: 'black' }} >
                    <Typography sx={{ padding: '15px' }} variant="h6">
                        просмотр профиля других пользоватей и их коллекций
                    </Typography>
                </Box>

                <CardMedia sx={{ border: 'solid 1.5px #646cff', borderRadius: '16px', maxWidth: '44%' }} component={'video'} muted autoPlay loop image={'../src/assets/video/favv.mp4'} />


            </Box>
            <Box marginBottom={'30px'} marginLeft={'auto'} marginRight={'auto'} marginTop={'140px'} sx={{ width: '50%', padding: '12px', border: ' solid 2px black ', borderRadius: '40px', backgroundColor: 'white' }}>
                <Typography variant="h2">
                    Присоединяйтесь к нашему сообществу и погрузитесь в увлекательный мир медиа-франшиз вместе с OTHEREALM!
                </Typography>
            </Box>
            {!selectIsAuth && 
            <Link to={'/auth'}>
                <ColorButtonBlue sx={{ width: '20%', height: '70px' }}>присоединиться</ColorButtonBlue>
            </Link>
            }
        </Box>
    )
}