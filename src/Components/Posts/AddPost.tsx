import { Box, Button, IconButton, TextField } from "@mui/material"
import React from "react";
import SimpleMDE, { SimpleMdeReact } from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import { ColorButton, ColorButtonBlue } from "../CustomButton";
import axios from '../../axios'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppSelector } from "../../store/hooks";


export const AddPost = () => {

    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const inputFileRef = React.useRef(null);

    const userNick = useAppSelector((state) => state.authData.data?.nick)
    const userId = (useAppSelector((state) => state.authData.data?._id));
    const selectedUserId = (useAppSelector((state) => state.authData.selectedUserData?._id));
    const isNotSameUser = (userId == selectedUserId)

    const { postId } = useParams();
    const isEditing = Boolean(postId)

    if (!isNotSameUser){
        navigate(`/post/${postId}`);
    }

    React.useEffect(() => {
        if (postId !== undefined) {
            axios.get(`/post/${postId}`).then(res => {
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
                    action: function (editor) {
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

    const handleChangePreview = async (event) => {
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
                title, text, imageUrl,
            }
            const { data } = isEditing ? await axios.patch(`/post/${postId}`, fields) : await axios.post('/posts', fields);
            const _id = isEditing ? postId : data._id;
            navigate(`/post/${_id}`);

        } catch (err) {
            console.warn(err);
            alert("ошибка при создании поста")
        }
    }

    const onClickRemove = async() =>{
        try {
            if (window.confirm('вы уверены что ходите удалить пост?')){
                await axios.delete(`/post/${postId}`)
                navigate(`/profile/${userNick}`);
            }

        } catch (err) {
            console.warn(err);
            alert("ошибка при удалении поста")
        }
    }

    return (
        <div className="addPostWrapper">
            <div className="addPost">
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