import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, TextField } from "@mui/material"
import { PopupWithTrigger } from "../Popup.tsx"
import React from "react"
import AddIcon from '@mui/icons-material/Add';
import axios from '../../axios.ts'
import { CheckBox } from "@mui/icons-material";
import { useAppSelector } from "../../store/index.ts";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { useAppDispatch } from "../../store/hooks.tsx";
import { addFavourites, clearFavourite, isFavourire } from "../../store/favourite.ts";

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


