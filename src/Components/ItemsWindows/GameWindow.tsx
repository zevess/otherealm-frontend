import { Avatar, Box, CircularProgress, IconButton, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"

import React, { FC, useEffect } from "react";

import { CommentSection } from "./CommentWindow/CommentSection";
import { DiscussSection, } from "./DiscussWindow/DiscussSection";
import { ItemTitle } from "./ItemComponents/ItemTitle";
import { handleChange } from "../../utils/handleChange";
import { ItemType } from "./ItemComponents/ItemType";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store/hooks";

import { ItemDescription } from "./ItemComponents/ItemDescription";
import { gameItemFetch } from "../../store/fetches/gameFetch";

import { AddToSection } from "../SectionsPopup/AddToSections";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

export const GameWindow = () => {

    const dispatch = useAppDispatch();
    const params = useParams();
    const gameId = String(params.id);

    const rawgToken = useAppSelector((state) => state.gameData.rawgToken);
    React.useEffect(() => {
        dispatch(gameItemFetch({ gameId, rawgToken }));
    }, [])

    const [alignment, setAlignment] = React.useState('comments');

    const currentGameItem = useAppSelector((state) => state.gameData.currentGameItem)


    const title = `${currentGameItem?.name}`;
    let fontSize;
    if (title.length > 100) fontSize = '20px';

    if (currentGameItem == undefined) {
        return <CircularProgress />
    }


    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const postId = String(parts.slice(-2).join(''))


    return (

        <div className="searchItemWrapper">
            <div className="searchItem">
                <img className="searchItem__background" src={`${currentGameItem?.background_image}`} alt="" />
                <div className="searchItemContent">
                    <div className="searchItemContent__details">
                        <div className="searchItemContent__main">

                            <img className="searchItemContent__main-poster" src={`${currentGameItem?.background_image}`} alt="" />

                            <ItemTitle title={`${title}`} originalTitle={`${currentGameItem?.name_original}`} />
                            <ItemType itemType={`game`} />
                        </div>
                        <div className="searchItemContent__options">

                            <div className="searchItemContent__options-item">
                                <div className="searchItemContent__options-name">
                                    <Typography variant="h5">инфо</Typography>
                                </div>
                                <AddToSection />
                            </div>
                            <div className="searchItemContent__info">

                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant='h5' paddingRight={'10px'}>оценка METACRITIC: </Typography>
                                    <Typography variant='h5' paddingRight={'10px'}>{currentGameItem.metacritic}</Typography>
                                </div>

                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant='h5' paddingRight={'10px'}>дата выхода: </Typography>
                                    <Typography variant='h5' paddingRight={'10px'}>{currentGameItem.released}</Typography>
                                </div>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>разработчики: </Typography>
                                    {currentGameItem.developers.map((devs, index) => (
                                        <Typography paddingRight={'10px'} variant="h5" key={index}>{devs.name}</Typography>
                                    ))}
                                </div>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>издатели: </Typography>
                                    {currentGameItem.publishers.map((publisher, index) => (
                                        <Typography paddingRight={'10px'} variant="h5" key={index}>{publisher.name}</Typography>
                                    ))}
                                </div>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>жанры: </Typography>
                                    {currentGameItem.genres.map((genre, index) => (
                                        <Typography paddingRight={'10px'} variant="h5" key={index}>{genre.name}</Typography>
                                    ))}
                                </div>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>платформы: </Typography>
                                    {currentGameItem.platforms.map((platform, index) => (
                                        <Typography paddingRight={'10px'} variant="h5" key={index}>{platform.platform.name},</Typography>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ItemDescription description={`${currentGameItem?.description_raw}`} />
                </div>
            </div>



            <ToggleButtonGroup color="primary" exclusive onChange={(event, newAlignment) => handleChange(event, newAlignment, setAlignment)} value={alignment} className="searchItemToggles">
                <ToggleButton value={'comments'}>
                    комментарии <InsertCommentOutlinedIcon />
                </ToggleButton>
                <ToggleButton value={'discuss'} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    обсуждения <ForumOutlinedIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            <Box width={'90%'}>
                {alignment == 'comments' ? <CommentSection postId={postId} /> : <DiscussSection />}
            </Box>
        </div>

    )
}
