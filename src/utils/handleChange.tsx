import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store/hooks";

export const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
    setAlignment: React.Dispatch<React.SetStateAction<any>>,
) => {
    // console.log(newAlignment)
    if (newAlignment !== null) {
        setAlignment(newAlignment);
    }
};