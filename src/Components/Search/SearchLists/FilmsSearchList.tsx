import { Box, CircularProgress, Pagination } from "@mui/material";
import { useAppSelector } from "../../../store";
import { useAppDispatch } from "../../../store/hooks";
import { ItemCard } from "../../Cards/ItemCard";
import { setMediaPage } from "../../../store/reducers/stateReducer";
import { filmFetch } from "../../../store/fetches/filmFetch";

export const FilmsSearchList = () => {
    const dispatch = useAppDispatch();
    const searchTitleSelector = useAppSelector((state) => state.state.searchTitle)
    const searchTitle = searchTitleSelector.replace(' ', '_');
    const kpToken = useAppSelector((state) => state.filmData.kpToken)
    const filmResult = useAppSelector(state => state.filmData.filmResult?.docs);
    const currentMediaPageSelector = useAppSelector(state => state.state.currentMediaPage);
    const totalMediaPage = useAppSelector(state => state.state.totalMediaPage)
    const filmsLoadingStatus = useAppSelector(state => state.filmData.filmsLoadingStatus)

    console.log(filmsLoadingStatus);

    if (filmsLoadingStatus === 'loading'){
        return <CircularProgress/>
    }

    return (
        <>
            <Box display={'flex'} flexWrap={'wrap'} alignItems={'flex-start'}>
                {filmResult !== undefined && filmResult.map((item) => (
                    <ItemCard itemPoster={item.poster?.url ? item.poster.url : '../src/assets/img/noImg.png'} itemTitle={item.name} id={item.id} key={item.id} itemType={item.type} itemAltenativeTitle={item.alternativeName} />
                ))}
            </Box>
            <Pagination page={currentMediaPageSelector} count={totalMediaPage} onChange={(event, value) => {
                dispatch(setMediaPage(value))
                dispatch(filmFetch({searchTitle, currentMediaPage: value, kpToken}))
            }} />
        </>
    )
}