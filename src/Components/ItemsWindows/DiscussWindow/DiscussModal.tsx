import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { ButtonUsage } from "../../Button"
import { ColorButton, ColorButtonBlue } from "../../CustomButton"
import React, { FC } from "react"
import axios from '../../../axios'

interface DiscussModalProps{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<React.SetStateAction<any>>,
}

export const DiscussModal: FC<DiscussModalProps> = ({setModalOpen, setData}) => {

    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const itemId = String(parts.slice(-2).join(''))
    console.log(itemId)

    const onSubmit = async () => {
        try {
            const fields = {
                title,
                text,
                itemId
            }
    
            await axios.post('/discuss', fields);

            axios.get(`/discuss/${itemId}`).then(res => {
                setData(res.data);
                setModalOpen(false)
            })
        } catch (err) {
            console.warn(err);
            alert("ошибка при создании обсуждения")
        }
    }
    return (
        <Box border={'solid 5px #7b7eb4'} bgcolor={"white"} width={'60%'} padding={'20px'} height={'auto'} maxHeight={'80%'} position={'absolute'} overflow={'scroll'} top={'50%'} left={'50%'} sx={{ transform: 'translate(-50%, -50%)', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" textAlign={'center'} marginBottom={'20px'} padding={'10px'}>создать обсуждение</Typography>
            <TextField value={title} onChange={(event) => setTitle(event.target.value)} variant="outlined" multiline placeholder="введите название обсуждения" inputProps={{
                style: {
                    fontSize: '30px',  lineHeight: '1.4'
                }
            }} InputProps={{
                style: {
                    borderRadius: '20px'
                }
            }} sx={{ width: '100%', marginBottom: '20px' }}></TextField>
            <TextField value={text} onChange={(event) => setText(event.target.value)} variant="outlined" multiline placeholder="введите текст обсуждения (не менее 10 символов)" inputProps={{
                style: {
                    fontSize: '20px', lineHeight: '1.4',  overflow: 'visible'
                }
            }} InputProps={{
                style: {
                    borderRadius: '30px'
                }
            }} sx={{ width: '100%', marginBottom: '40px' }}></TextField>

            <ColorButtonBlue size="large" onClick={onSubmit}>создать обсуждение</ColorButtonBlue>
        </Box>

    )
}