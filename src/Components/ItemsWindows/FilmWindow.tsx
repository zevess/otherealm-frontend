import { Avatar, Box, CircularProgress, IconButton, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { FranchiseCard } from "../Cards/FranchiseCard"
import { ButtonUsage } from "../Button"
import React, { FC, useEffect } from "react";
import { deepOrange } from "@mui/material/colors";
import { InputText } from "../InputText";
import { Comment } from "./CommentWindow/Comment";
import { CommentSection } from "./CommentWindow/CommentSection";
import { DiscussSection, } from "./DiscussWindow/DiscussSection";
import { ItemTitle } from "./ItemComponents/ItemTitle";
import { handleChange } from "../../utils/handleChange";
import { ItemType } from "./ItemComponents/ItemType";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import { filmItemFetch } from "../../store/fetches/filmFetch";
import { ItemDescription } from "./ItemComponents/ItemDescription";
import { AddToSection } from "../SectionsPopup/AddToSections";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

export const FilmWindow = () => {

    const dispatch = useAppDispatch();
    const params = useParams();
    const paramsId = String(params.id);
    const [alignment, setAlignment] = React.useState('comments');

    const token = useAppSelector((state) => state.filmData.kpToken)
    React.useEffect(() => {
        dispatch(filmItemFetch({ paramsId, token }));
    }, [])
    const currentFilmItem = useAppSelector((state) => state.filmData.currentFilmItem)

    const title = `${currentFilmItem?.name}`;
    let fontSize;
    if (title.length > 100) fontSize = '20px';

    console.log(`${currentFilmItem?.type}`)

    if (currentFilmItem == undefined) {
        return <CircularProgress />
    }

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const postId = String(parts.slice(-2).join(''))
    console.log(postId);

    return (
        <div className="searchItemWrapper">
            <div className="searchItem">
                <img className="searchItem__background" src={`${currentFilmItem?.poster?.url}`} alt="" />
                <div className="searchItemContent">
                    <div className="searchItemContent__details">
                        <div className="searchItemContent__main">

                            <img className="searchItemContent__main-poster" src={`${currentFilmItem?.poster?.url}`} alt="" />

                            <ItemTitle title={`${title}`} originalTitle={`${currentFilmItem?.alternativeName}`} />
                            <ItemType itemType={`${currentFilmItem?.type}`} />
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
                                    <Typography fontWeight={'bold'} variant='h5' paddingRight={'10px'}>страны: </Typography>
                                    {currentFilmItem?.countries?.map((country, index) => (
                                        <Typography paddingRight={'10px'} variant="h5" key={index++}>{country.name}{index !== currentFilmItem.countries?.length - 1 && ", "}</Typography>
                                    ))}
                                </div>
                                <Typography fontWeight={'bold'} paddingBottom={'15px'} variant="h5">год: {currentFilmItem.year}</Typography>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>жанры: </Typography>
                                    {currentFilmItem.genres?.map((genre, index) => (
                                        <Typography paddingRight={'10px'} variant="h5" key={index}>{genre.name}{index !== currentFilmItem.genres?.length - 1 && ','}</Typography>
                                    ))}
                                </div>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>режиссер: </Typography>
                                    {currentFilmItem.persons?.map((person, index) => (
                                        person.enProfession == 'director' && <Typography paddingRight={'10px'} variant="h5" key={index}>{person.name}</Typography>

                                    ))}
                                </div>
                                <div className="searchItemContent__info-item">
                                    <Typography fontWeight={'bold'} variant="h5" paddingRight={'10px'}>актеры: </Typography>
                                    {currentFilmItem.persons?.map((person, index) => (
                                        (person.enProfession == 'actor') && <Typography paddingRight={'10px'} variant="h5" key={index++}>{person.name},</Typography>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ItemDescription description={`${currentFilmItem?.description}`} />
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
