import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import React, { FC } from "react";

interface DivideToggleGroupProps{
    alignment: string,
    items: [
        {
            title: string,
            id: string
        }
    ],
    handleChange:(
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) =>void;
    
}

export const DivideToggleGroup: FC<DivideToggleGroupProps> = ({alignment, items, handleChange}) => {

    return (
        <ToggleButtonGroup exclusive onChange={handleChange} value={alignment} sx={{ display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
            {(items).map((item, key) => (
                <ToggleButton value={item} key={key} sx={{ maxWidth: '200px', height: 'auto', borderLeft: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '20px'}}>{item.title}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}