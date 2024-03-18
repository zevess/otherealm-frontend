import { Box } from "@mui/material"
import { DiscussInput } from "./DiscussInput"
import { DiscussButton } from "./DiscussButton"
import { ModalWindow } from "../../ModalWindow"
import React from "react"
import { DiscussModal } from "./DiscussModal"
import { DiscussLinkItem } from "./DiscussLinkItem"
import axios from '../../../axios'
import { useAppDispatch } from "../../../store/hooks"
import { addDiscuss, clearDiscuss } from "../../../store/discuss"

export const DiscussSection = () => {
    const dispatch = useAppDispatch()
    const [modalOpen, setModalOpen] = React.useState(false)
    const [data, setData] = React.useState<any>();

    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const itemId = String(parts.slice(-2).join(''))

    React.useEffect(() => {
        axios.get(`/discuss/${itemId}`).then(res => {
            setData(res.data);
            dispatch(addDiscuss(res.data));
        })

        return () =>{
            dispatch(clearDiscuss())
        }

    }, [])

    console.log(data);

    return (
        <Box display={'flex'} flexDirection={'column'} >
            <Box display={'flex'} justifyContent={'space-around'} >
                <DiscussInput />
                <DiscussButton setModalOpen={setModalOpen} />
                <ModalWindow open={modalOpen} handleClose={() => setModalOpen(false)}>
                    <DiscussModal setData={setData} setModalOpen={setModalOpen} />
                </ModalWindow>
            </Box>
            <Box>
                {data !== undefined && data.map((item: any) => (
                    <DiscussLinkItem linkTo={item?._id} author={item.user.name} title={item?.title}/>
                ))}
            </Box>
        </Box>
    )
}