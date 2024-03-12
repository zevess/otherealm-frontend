import { TextField } from "@mui/material"
import { PopupWithTrigger } from "./Popup"

export const CreateSection = () => {
    return (
        <PopupWithTrigger id="popup-with-portal" buttonLabel="With a portal">
            <TextField></TextField>
        </PopupWithTrigger>
    )
}

