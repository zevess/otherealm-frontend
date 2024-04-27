import { Box, Button } from "@mui/material"
import { DiscussInput } from "./DiscussInput"
import { DiscussButton } from "./DiscussButton"
import { ModalWindow } from "../../ModalWindow"
import React from "react"
import { DiscussModal } from "./DiscussModal"
import { DiscussLinkItem } from "./DiscussLinkItem"
import axios from '../../../axios'
import { useAppDispatch } from "../../../store/hooks"
import { addDiscuss, clearDiscuss } from "../../../store/discuss"
import { ColorButtonBlue } from "../../CustomButton"

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
        <div className="discussSection">
            <div className="discussSection__inputs">
                {/* <DiscussInput /> */}
                {/* <DiscussButton setModalOpen={setModalOpen} /> */}
                {/* <Button onClick={() => setModalOpen} className="discussCreateButton">создать обсуждение</Button> */}
                <ColorButtonBlue onClick={() => setModalOpen(true)} className="discussCreateButton">создать обсуждение</ColorButtonBlue>
                <ModalWindow open={modalOpen} handleClose={() => setModalOpen(false)}>
                    <DiscussModal setData={setData} setModalOpen={setModalOpen} />
                </ModalWindow>
            </div>
            <Box>
                {data !== undefined && data.map((item: any) => (
                    <DiscussLinkItem linkTo={item?._id} author={item.user.name} title={item?.title}/>
                ))}
            </Box>
        </div>
    )
}