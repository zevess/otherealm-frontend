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
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import { filmItemFetch } from "../../store/fetches/filmFetch";
import { ItemDescription } from "./ItemComponents/ItemDescription";
import { gameItemFetch } from "../../store/fetches/gameFetch";
import { AddToSection } from "../CreateSection";


export const GameWindow = () => {

    const dispatch = useAppDispatch();
    const params = useParams();
    const gameId = String(params.id);
    console.log(gameId);
    const rawgToken = useAppSelector((state) => state.gameData.rawgToken);
    React.useEffect(()=>{
        dispatch(gameItemFetch({gameId, rawgToken} ));
    }, [])
    
    const [alignment, setAlignment] = React.useState('comments');

    const currentGameItem = useAppSelector((state) => state.gameData.currentGameItem)
    
    
    const title = `${currentGameItem?.name}`;
    let fontSize;
    if (title.length > 100) fontSize = '20px';    

    if(currentGameItem == undefined){
        return <CircularProgress/>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1500px', marginLeft: 'auto', marginRight: 'auto' }} >
            <Box maxWidth={'1500px'} >
                <Box component={'img'} src={`${currentGameItem?.background_image}`} width={'100%'} height={'483px'} borderRadius={'16px'} sx={{ objectFit: 'cover', filter: 'blur(5px)' }}></Box>
                <Box bgcolor={'white'} border={'solid 2px black'} height={'auto'} paddingBottom={'20px'} >
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Box marginTop={'-20%'} display={'flex'} alignItems={'flex-start'} >

                            <Box zIndex={1} height={'571px'} component={'img'} src={`${currentGameItem?.background_image}`} sx={{
                                aspectRatio: '380/571', objectFit: 'cover'
                            }}></Box>
                            
                            <ItemTitle title={`${title}`} originalTitle={`${currentGameItem?.name_original}`} />
                            <ItemType itemType={`game`} />
                        </Box>
                        <Box width={'64%'} display={'flex'} flexDirection={'column'} >
                            
                            <Box width={'100%'} bgcolor={'rgba(239, 239, 239, 1)'} display={'flex'} height={'70px'}>
                                <Box width={'100%'} border={'solid 1px black'} borderTop={'none'} borderLeft={'none'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Typography variant="h5">инфо</Typography>
                                </Box>
                                <AddToSection/>
                                {/* <ButtonUsage onClick={() => alert("W")} style={{ width: '30%', backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                                    добавить в раздел
                                </ButtonUsage> */}
                            </Box>
                            <Box marginRight={'auto'} marginLeft={'40px'} marginTop={'20px'} display={'flex'} flexDirection={'column'}> 
                                <Box display={'flex'}>
                                    
                                </Box>
                            </Box>
                            
                        </Box>
                    </Box>
                    <ItemDescription description={`${currentGameItem?.description_raw}`}/>

                </Box>

            </Box>

            <ToggleButtonGroup color="primary" exclusive onChange={(event, newAlignment) => handleChange(event, newAlignment, setAlignment)} value={alignment} sx={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginTop: '60px', marginBottom: '40px' }}>
                <ToggleButton value={'comments'}>комментарии</ToggleButton>
                <ToggleButton value={'discuss'} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}>обсуждения</ToggleButton>
            </ToggleButtonGroup>

            <Box width={'90%'}>
                {alignment == 'comments' ? <CommentSection /> : <DiscussSection />}
            </Box>
        </div>
    )
}
