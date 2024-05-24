import { Box, Typography } from "@mui/material"
import { FC } from "react"

interface ItemTitleProps{
    title: string,
    originalTitle?: string,
    sx?: React.CSSProperties
}

export const ItemTitle:FC<ItemTitleProps> = ({title, originalTitle, sx}) => {
    return (
        <div className="searchItemContent__main-title" style={sx}>
            <p style={{fontSize: '24px', margin: '0'}}>{title}</p>
            {/* <Typography variant="h4">{title}</Typography> */}
            {originalTitle && <hr />}
            <p style={{margin: 0}}>{originalTitle}</p>
            {/* <Typography variant="h6">{originalTitle}</Typography> */}
        </div>
            
        
    )
}