import { Box, Button, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material"
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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ModalWindow } from "../ModalWindow.tsx"
import { purple, red } from "@mui/material/colors"
import { ColorButton } from "../CustomButton.ts"


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
    const favourites = useAppSelector((state) => state.favouriteData.favourites.items);
    const currentFilterItem = (useAppSelector((state) => state.state.currentFilterItem));

    const isNotSameUser = (userId == selectedUserId)
    
    const [alignment, setAlignment] = React.useState();
    const [editTitle, setEditTitle] = React.useState('');
    const [toggleSetting, setToggleSetting] = React.useState(Boolean);

    let currentItems: any[] = [];
    let currentFavId: any;

    const updateFavourites = () =>{
        if (selectedUserId !== undefined) {
            axios.get(`/favourite/${selectedUserId}`).then(res => {
                setAlignment((res.data)?.[0]?.title);
                dispatch(addFavourites(res.data));
            }).catch(err => {
                console.warn(err);
            })
        }
    }

    React.useEffect(() => {
        if (selectedUserId !== undefined) {
            axios.get(`/favourite/${selectedUserId}`).then(res => {
                setAlignment((res.data)?.[0]?.title);
                dispatch(addFavourites(res.data));
            }).catch(err => {
                console.warn(err);
            })
        }
        return () => {
            dispatch(clearFavourite());
        }
    }, [selectedUserId])

    favourites.map((item: any) =>{
        if(alignment == item?.title){
            currentItems = item?.items;
            currentFavId = item?._id
        }
    })

    const filteredItems = currentFilterItem === 'all' ? currentItems : currentItems.filter(item => item.itemType === currentFilterItem); 
    
    const favId = String(currentFavId);

    const editFields = {
        editTitle,
        favId
    }

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
                    <ToggleButtonGroup value={alignment} exclusive onChange={
                        (event, newAlignment) => {
                            handleChange(event, newAlignment, setAlignment);
                            // setSelectedToggle(event.target.id);
                        }
                        } sx={{display: 'flex', flexDirection: 'column'}}>
                        {favourites.map((item) =>(
                            <ToggleButton sx={{ maxWidth: '200px', height: 'auto', borderLeft: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '20px'}} id={item?._id} key={item?._id} value={item?.title}>
                                {item?.title}
                                <IconButton onClick={() => {
                                    setToggleSetting(true)
                                    } }>
                                    <SettingsOutlinedIcon/>    
                                </IconButton>    
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    {isNotSameUser && <CreateSection updateFavourites={updateFavourites}/>}
                </Box>

                {toggleSetting && <ModalWindow open={toggleSetting} handleClose={() => setToggleSetting(false)}>
                    <Box width={'40%'} minHeight={'30%'} bgcolor={'white'} position={'absolute'} top={'35%'} left={'30%'} border={'2px solid black'} boxShadow={'24'} padding={'15px'}>
                        <Typography  textAlign={'center'} variant="h4">{alignment}</Typography>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <TextField onChange={(event) => setEditTitle(event.target.value)} sx={{ width: '50%', margin: '10px' }} size="medium" placeholder="изменить название раздела"></TextField>
                            <Box padding={'12px'} width={'50%'} justifyContent={'space-between'} display={'flex'}>
                                <ColorButton onClick={() =>{
                                    axios.delete(`/favourite/remove/${favId}`).then(() => {
                                        setToggleSetting(false)
                                        if(favourites.length == 1){
                                            dispatch(clearFavourite());
                                        }
                                        // console.log(favourites.length);
                                    }).catch(err =>{
                                        console.warn(err);
                                    }).finally(() => updateFavourites()) 
                                }} >удалить</ColorButton>
                                <Button variant="contained" onClick={()=>{
                                    axios.post(`/favourite/edit/${selectedUserId}`, editFields).then(() => {
                                        updateFavourites()
                                        setToggleSetting(false)
                                        
                                    }).catch(err =>{
                                        console.warn(err);
                                        alert('раздел с таким названием уже есть');
                                    })
                                }}>сохранить</Button>
                            </Box>
                        </Box>
                        
                    </Box>
                </ModalWindow>}

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



