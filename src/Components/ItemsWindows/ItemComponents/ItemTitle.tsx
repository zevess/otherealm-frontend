import { Box, Typography } from "@mui/material"
import { FC } from "react"

interface ItemTitleProps{
    title: string,
    originalTitle?: string
}

export const ItemTitle:FC<ItemTitleProps> = ({title, originalTitle}) => {
    return (
        <div className="searchItemContent__main-title">
            <Typography variant="h4">{title}</Typography>
            <hr />
            <Typography variant="h6">{originalTitle}</Typography>
        </div>
            
        
    )
}