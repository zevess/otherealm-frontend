import { Box, Pagination, Typography } from "@mui/material"
import { InputText, inputStyles } from "../InputText"
import { ItemCard } from "../Cards/ItemCard"
import { itemArr } from "../../utils/itemsArr"
import React from "react"
import { useAppSelector } from "../../store"
import { filmFetch } from "../../store/fetches/filmFetch"
import { useAppDispatch } from "../../store/hooks"
import { SearchToggleGroup } from "../Toggles/SearchToggleGroup"
import { searchToggleItems, sections } from "../../utils/itemTypes"
import { handleChange } from "../../utils/handleChange"
import { SectionToggleGroup } from "../Toggles/SectionToggleGroup"
import { booksFetch } from "../../store/fetches/bookFetch"
import { addItemTitle, setMediaPage, setSearchSection, setTotalBookPage, setTotalGamePage, setTotalMediaPage } from "../../store/reducers/stateReducer"
import { SearchResult } from "./SearchResultList"
import { gameFetch } from "../../store/fetches/gameFetch"
import { gameFetchTest } from "../../utils/test"
import axios from "axios"

export const Search = () => {

    const dispatch = useAppDispatch();

    const [text, setText] = React.useState('');

    const [searchAlignment, setSearchAlignment] = React.useState(Object.keys(searchToggleItems)[0]);

    const searchTitleSelector = useAppSelector((state) => state.state.searchTitle)
    const searchTitle = searchTitleSelector.replace(' ', '_');

    const kpToken = useAppSelector((state) => state.filmData.kpToken)
    const gbToken = useAppSelector((state) => state.bookData.gbToken)
    const rawgToken = useAppSelector((state) => state.gameData.rawgToken);
    const currentMediaPage = useAppSelector((state) => state.state.currentMediaPage);
    const currentBookPage = useAppSelector((state) => state.state.currentBookPage);
    const currentGamePage = useAppSelector((state) => state.state.currentGamePage);

    const bookState = useAppSelector((state) => state.bookData)
    const filmState = useAppSelector((state) => state.filmData)
    const gameState = useAppSelector((state) => state.gameData)

    if (bookState.bookResult?.totalItems !== undefined) {
        dispatch(setTotalBookPage(Math.ceil(Number(bookState.bookResult.totalItems / 120))))
    }

    if (gameState.gameResult?.count !== undefined) {
        dispatch(setTotalGamePage(Math.ceil(gameState.gameResult.count / 20)))
    }

    if (filmState.filmResult?.pages !== undefined) {
        dispatch(setTotalMediaPage(filmState.filmResult.pages))
    }


    React.useEffect(() => {
        dispatch(addItemTitle(text));
    }, [text, searchAlignment])
    dispatch(setSearchSection(searchAlignment));


    const getFilms = (searchTitle: string, currentMediaPage: number, kpToken: string) => {
        if (searchTitle !== (null || '')) {
            dispatch(filmFetch({ searchTitle, currentMediaPage, kpToken }))
        } else {
            alert("поле ввода не должно быть пустым!")
            return
        }
    }

    const getBooks = (searchTitle: string, gbToken: string, currentBookPage: number) => {
        if (searchTitle !== (null || '')) {
            dispatch(booksFetch({ searchTitle, gbToken, currentBookPage }))
        } else {
            alert("поле ввода не должно быть пустым!")
            return
        }
    }

    const getGame = (searchTitle: string, rawgToken: string, currentGamePage: number) => {
        if (searchTitle !== (null || '')) {
            dispatch(gameFetch({ searchTitle, rawgToken, currentGamePage }))
        } else {
            alert("поле ввода не должно быть пустым!")
            return
        }
    }

    return (
        <div className="searchWrapper">
            <InputText setText={setText} onClick={() => {
                getFilms(searchTitle, currentMediaPage, kpToken)
                getBooks(searchTitle, gbToken, currentBookPage)
                getGame(searchTitle, rawgToken, currentGamePage)
            } } placeholder="поиск фильма, игры, литературы" text={text} />
            <div className="searchContent">
                <SearchToggleGroup items={searchToggleItems} handleChange={(event, newAlignment) => handleChange(event, newAlignment, setSearchAlignment)} alignment={searchAlignment} ></SearchToggleGroup>
                <div className="searchSource">
                    <p  className="searchSourceText">Все результаты взяты из открытых источников:</p>
                    <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        <a className="searchSourceLink" href="https://api.kinopoisk.dev/documentation">api.kinopoisk.dev </a>
                        <p className="searchSourceText">|</p>
                        <a className="searchSourceLink" href="https://rawg.io">rawg.io</a>
                        <p className="searchSourceText">|</p>
                        <a className="searchSourceLink" href="https://developers.google.com/books?hl=ru">developers.google.com/books</a>
                    </Box>
                    <p className="searchSourceText">соответственно</p>
                    <p className="searchSourceText">Результаты могут отличаться от ожидаемых.</p>
                    <p className="searchSourceText">Для получения более точных вводите полные названия на оригинальном языке.</p>
                </div>
                <SearchResult />
            </div>
        </div>
    )
}

