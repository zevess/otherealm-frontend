import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, TextField } from "@mui/material"
import { PopupWithTrigger } from "./Popup"
import React from "react"
import AddIcon from '@mui/icons-material/Add';
import axios from '../axios.ts'
import { CheckBox } from "@mui/icons-material";
import { useAppSelector } from "../store/index.ts";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useAppDispatch } from "../store/hooks.tsx";
import { isFavourire } from "../store/favourite.ts";

export const CreateSection = () => {

    const [title, setTitle] = React.useState('');

    const onSubmit = async () => {
        try {

            const fields = {
                title
            }
            await axios.post('/favourite', fields)

        } catch (err) {
            console.warn(err);
            alert('ошибка при создании раздела')
        }
    }

    return (
        <PopupWithTrigger id="popup-with-portal" buttonLabel="СОЗДАТЬ РАЗДЕЛ">
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <TextField variant="outlined" placeholder="название раздела" onChange={(event) => {
                    setTitle(event.target.value);
                }}></TextField>
                <IconButton onClick={onSubmit}>
                    <AddIcon />
                </IconButton>
            </Box>

        </PopupWithTrigger>
    )
}

export const AddToSection = () => {

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const itemType = (parts.slice(-2))[0];

    const itemTitle = useAppSelector((state) => state.gameData.currentGameItem?.name);
    const itemBackgroundImage = useAppSelector((state) => state.gameData.currentGameItem?.background_image)
    const itemId = useAppSelector((state) => state.gameData.currentGameItem?.id);

    
    const favourites = useAppSelector((state) => state.favouriteData.favourites.items);

    const favouriteArr = {};

    favourites.forEach((item) => {
        const foundItem = item.items.find((i: any) => i.itemId === String(itemId));
        favouriteArr[item.title] = { checked: foundItem ? true : false, _id: item._id };
    })

    
    const [arrFavourite, setArrFavourite] = React.useState({ ...favouriteArr});

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value, id } = event.target;
        setArrFavourite((prevArr) => {
            return {
                ...prevArr,
                [value]: { ...prevArr[value], checked }
            }
        })
        try {
            const fields = {
                itemId, itemTitle, itemBackgroundImage, itemType
            }

            if (checked) {
                await axios.patch(`/favourite/${id}`, fields);
            }

        } catch (err) {
            console.warn(err);
            alert('ошибка при добавлении в раздел')
        }
    }
    console.log(favouriteArr);
    console.log(arrFavourite);
    
    return (
        <PopupWithTrigger id="popup-with-portal" buttonLabel="ДОБАВИТЬ В РАЗДЕЛ">
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <FormGroup>
                    {favourites.map((items: any) => (
                        <FormControlLabel control={<Checkbox checked={arrFavourite[items.title].checked} id={items._id} value={items.title} onChange={onChange} />} label={items.title} />
                    ))}
                </FormGroup>
            </Box>
        </PopupWithTrigger>
    )
}


