import { Box, Button, Divider, IconButton, TextField } from "@mui/material"
import React from "react";
import SimpleMDE, { SimpleMdeReact } from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import axios from '../../../axios'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ColorButton, ColorButtonBlue } from "../../CustomButton";
import { ItemTitle } from "../ItemComponents/ItemTitle";
import { fetchAddDiscuss } from "../../../store/discuss";


export const AddDiscuss = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const inputFileRef = React.useRef<any>(null);

    const userNick = useAppSelector((state) => state.authData.data?.nick)
    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.usersData.currentUser.items?._id));


    const bookSelector = useAppSelector((state) => state.bookData.currentBookItem);
    const filmSelector = useAppSelector((state) => state.filmData.currentFilmItem);
    const gameSelector = useAppSelector((state) => state.gameData.currentGameItem);


    let discussObjectTitle
    const isSameUser = (userId == selectedUserId)


    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const itemId = `${parts[4]}${parts[5]}`
    const itemIdSlash = `${parts[4]}/${parts[5]}`

    // console.log(itemIdSlash)

    if (currentUrl.includes('book')) {
        discussObjectTitle = bookSelector?.volumeInfo?.title
    } else if (currentUrl.includes('game')) {
        discussObjectTitle = gameSelector?.name
    } else if (currentUrl.includes('movie') || currentUrl.includes('cartoon') || currentUrl.includes('tv-series') || currentUrl.includes('anime') || currentUrl.includes('animated-series')) {
        discussObjectTitle = filmSelector?.name
    }

    if (discussObjectTitle !== undefined) {
        window.localStorage.setItem('currentObjectTitle', `${discussObjectTitle}`)
    }

    if ((filmSelector?.name || gameSelector?.name || bookSelector?.volumeInfo?.title) == undefined) {
        discussObjectTitle = window.localStorage.getItem('currentObjectTitle');
    }

    const {discussId}  = useParams();
    console.log(discussId)
    const isEditing = Boolean(discussId)

    // if (isSameUser == false){
    //     navigate(`/post/${postId}`);
    // }

    React.useEffect(() => {
        if (discussId !== undefined) {
            axios.get(`/discuss/${itemId}/${discussId}`).then(res => {
                setTitle(res.data.title);
                setText(res.data.text);
                setImageUrl(res.data.imageUrl);
            })
        }

    }, [])


    

    const onChangeText = React.useCallback((value: string) => {
        setText(value);
    }, []);

    const autofocusNoSpellcheckerOptions = React.useMemo(() => {
        return {
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
            toolbar: [
                "bold", "strikethrough", {
                    name: "underline",
                    action: function (editor: any) {
                        var cm = editor.codemirror;
                        var selectedText = cm.getSelection();
                        cm.replaceSelection("<u>" + selectedText + "</u>");
                    },
                    className: "fa fa-underline",
                    title: "Underline"
                }, "horizontal-rule", "heading", "|",
                "quote", "unordered-list", "ordered-list", "|",
                "link", "image", "|",
                "preview"
            ]
        } as SimpleMDE.Options;
    }, []);

    const handleChangePreview = async (event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData)
        console.log(data.url);
        setImageUrl(data.url);
    }

    const onSubmit = async () => {
        try {
            const fields = {
                title, text, imageUrl, itemId
            }
            // dispatch(fetchAddDiscuss(fields));
            // const {data} = await axios.post('/discuss', fields)
            const { data } = isEditing ? await axios.patch(`/discuss/${itemId}/${discussId}`, fields) : await axios.post('/discuss', fields);

            const _id = isEditing ? discussId : data._id;
            navigate(`/item/${itemIdSlash}/discuss/${_id}`);

        } catch (err) {
            console.warn(err);
            alert("ошибка при создании поста")
        }
    }

    const onClickRemove = async() =>{
        try {
            if (window.confirm('вы уверены что ходите удалить обсуждение?')){
                await axios.delete(`/discuss/${itemId}/${discussId}`)
                navigate(`/item/${itemIdSlash}`);
            }

        } catch (err) {
            console.warn(err);
            alert("ошибка при удалении поста")
        }
    }



    return (
        <div className="addPostWrapper">
            <div className="addPost">
                <p className="addPost__title">СОЗДАТЬ ОБСУЖДЕНИЕ</p>
                <ItemTitle title={`${discussObjectTitle}`} sx={{ margin: '0 auto' }} />
                <Divider sx={{ marginTop: '16px' }} />
                <div className="addPostInputs">
                    <input accept="image/*" ref={inputFileRef} type="file" onChange={handleChangePreview} hidden />
                    <Button onClick={() => inputFileRef.current.click()} sx={{ padding: '15px', margin: '8px' }}>загрузить превью</Button>
                    {imageUrl &&
                        <>
                            <Box component={'img'} maxWidth={'100%'} src={`http://localhost:4444${imageUrl}`}>
                            </Box>
                            <IconButton onClick={() => setImageUrl('')} >
                                <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </>


                    }
                    <TextField sx={{ margin: '8px' }} value={title} onChange={(event) => setTitle(event.target.value)} fullWidth placeholder="введите заголовок" />
                </div>
                <SimpleMdeReact
                    options={autofocusNoSpellcheckerOptions}
                    value={text}
                    onChange={onChangeText}
                />
                <div className="addPost__buttons">

                    {isEditing && <ColorButton onClick={() => onClickRemove()} size="large">удалить</ColorButton>}

                    <ColorButtonBlue onClick={() => onSubmit()} size="large">
                        {isEditing ? 'сохранить' : 'отправить'}
                    </ColorButtonBlue>

                </div>

            </div>
        </div>
    )
}