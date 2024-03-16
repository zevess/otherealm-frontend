import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { ItemCard } from "../Cards/ItemCard"
import React, { FC } from "react"
import { ItemTypeToggleGroup } from "../Toggles/ItemTypeToggleGroup"
import { divideItems, itemTypes } from "../../utils/itemTypes"
import { DivideToggleGroup } from "../Toggles/DivideToggleGroup"
import { handleChange } from "../../utils/handleChange"
import { PopupWithTrigger } from "../Popup"
import { CreateSection } from "../SectionsPopup/CreateSection.tsx"
import axios from '../../axios.ts'
import { useAppSelector } from "../../store"
import { useAppDispatch } from "../../store/hooks.tsx"
import { addFavourites, clearFavourite } from "../../store/favourite.ts"
import { setCurrentFavouriteItem } from "../../store/reducers/stateReducer.tsx"

interface ListWindowProps {
    type: string,
    divide?: string,
    setType: React.Dispatch<React.SetStateAction<string>>,
    setDivide?: React.Dispatch<React.SetStateAction<string>>,
}

export const ListWindow: FC<ListWindowProps> = ({ type, setType }) => {

    const dispatch = useAppDispatch();
    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.authData.selectedUserData?._id));
    // console.log(userId == selectedUserId);

    const isNotSameUser = (userId == selectedUserId)
    console.log(isNotSameUser);
    
    const [alignment, setAlignment] = React.useState();

    React.useEffect(() => {
        if (selectedUserId !== undefined) {
            axios.get(`/favourite/${selectedUserId}`).then(res => {
                setAlignment((res.data)?.[0]?.title);
                dispatch(addFavourites(res.data));
            }).catch(err => {
                console.warn(err);
                alert('ошибка при получении разделов')
            })
        }
        return () => {
            dispatch(clearFavourite());
        }
    }, [selectedUserId])

    let currentItems: any[] = [];
    const favourites = useAppSelector((state) => state.favouriteData.favourites.items);
    const currentFilterItem = (useAppSelector((state) => state.state.currentFilterItem));

    favourites.map((item: any) =>{
        if(alignment == item?.title){
            currentItems = item?.items;
        }
    })

    const filteredItems = currentFilterItem === 'all' ? currentItems : currentItems.filter(item => item.itemType === currentFilterItem);

    return (
        <Box sx={{ width: '1300px', maxWidth: '1300px', minHeight: '500px', backgroundColor: 'white', borderRadius: '24px', border: 'solid 1px black' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '12px' }}>

                <ItemTypeToggleGroup items={itemTypes} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setType)} alignment={type} />

            </Box>
        
            <div style={{ display: "flex" }}>

                <div className="listItems" style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', marginLeft: '40px' }}>
                    
                    {(filteredItems !== undefined) && filteredItems.map((item: any) => (
                        <ItemCard id={item.itemId} itemTitle={item.itemTitle} itemType={item.itemType} itemPoster={item.itemBackgroundImage}/>
                    ))} 
                    
                </div>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginLeft={'auto'}>
                    {/* {sections !== undefined && <DivideToggleGroup items={sections} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setDivide)} alignment={divide} />} */}
                    
                    <ToggleButtonGroup value={alignment} exclusive onChange={
                        (event, newAlignment) => handleChange(event, newAlignment, setAlignment)
                        } sx={{display: 'flex', flexDirection: 'column'}}>
                        {favourites.map((item) =>(
                            <ToggleButton sx={{ maxWidth: '200px', height: 'auto', borderLeft: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '20px'}} value={item?.title}>{item?.title}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    {isNotSameUser && <CreateSection />}
                </Box>
            </div>
        </Box>
    )
}

// itemBackgroundImage
// : 
// "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg"
// itemId
// : 
// "58751"
// itemTitle
// : 
// "Halo Infinite"
// itemType
// : 
// "game"
// 0: {
//     createdAt: "2024-03-15T18:00:03.759Z"
//     items: [
//         0: {
//             itemBackgroundImage: "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg"
//             itemId: "58751"
//             itemTitle: "Halo Infinite"
//             itemType: "game"
//             _id: "65f48d0d4317b9bd403a51a3"
//         }
        
        
//         1: {
//             itemBackgroundImage: "https://media.rawg.io/media/games/045/0457f748c9492261ccb46147edf9c761.jpg"
//             itemId: "28613"
//             itemTitle: "Halo: Reach"
//             itemType: "game"
//             _id: "65f49a81caea7c858de577c7"
//         }
//     ]
//     title: "1"
//     updatedAt: "2024-03-15T18:59:13.284Z"
//     user: "65f09a6dad36e583b431cbc8"
//     __v: 0
//     _id: "65f48ca34317b9bd403a518a"
// }

// 1: {
//     createdAt: "2024-03-15T18:00:08.666Z"
//     items: [
//         0: {
//             itemBackgroundImage: "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg"
//             itemId: "58751"
//             itemTitle: "Halo Infinite"
//             itemType: "game"
//             _id: "65f48d0d4317b9bd403a51a3"
//         }
        
        
//         1: {
//             itemBackgroundImage: "https://media.rawg.io/media/games/045/0457f748c9492261ccb46147edf9c761.jpg"
//             itemId: "28613"
//             itemTitle: "Halo: Reach"
//             itemType: "game"
//             _id: "65f49a81caea7c858de577c7"
//         }
//     ]
//     title: "2"
//     updatedAt: "2024-03-15T18:58:50.991Z"
//     user: "65f09a6dad36e583b431cbc8"
//     __v: 0
//     _id: "65f48ca84317b9bd403a518f"
// }



