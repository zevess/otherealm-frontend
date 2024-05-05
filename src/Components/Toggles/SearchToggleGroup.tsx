import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FC } from "react"

interface SearchToggleGroupProps{
    alignment: string,
    items: {
        [key: string]: string
    }, 
    handleChange:(
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) =>void;
}

export const SearchToggleGroup: FC<SearchToggleGroupProps> = ({alignment, items, handleChange}) => {
    return (
        <ToggleButtonGroup exclusive onChange={handleChange} value={alignment} className="toggleGroup search">
            {Object.keys(items).map((value, key) => (
                <ToggleButton value={value} key={key} style={{width: 'auto', height: 'auto', borderLeft: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '20px'}} className="toggleGroupItem">{items[value]}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}
