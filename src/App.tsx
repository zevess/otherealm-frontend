import { Navigate, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import { Layout } from './Components/Layout'
import { Search } from './Components/Search/Search'
import { Profile } from './Components/Profile/Profile'
import { ItemDiscussWindow } from './Components/ItemsWindows/DiscussWindow/ItemDiscussWindow'
import { FranchiseWindow } from './Components/FranchiseWindow/FranchiseWindow'
import { Provider } from 'react-redux'
import { store, useAppSelector } from './store'

import { GameWindow } from './Components/ItemsWindows/GameWindow'
import { FilmWindow } from './Components/ItemsWindows/FilmWindow'
import { BookWindow } from './Components/ItemsWindows/BookWindow'

import { Authorize, Registration } from './Components/RegistrationPage/Registration'
import { useAppDispatch } from './store/hooks'
import React from 'react'
import { fetchAuthMe } from './store/auth'
import axios from './axios'
import { addFavourites } from './store/favourite'
import { Welcome } from './Components/RegistrationPage/Welcome'


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='/search' element={<Search />} />
//       <Route path='/profile' element={<Profile />} />
//       <Route path='/item/movie/:id' element={<FilmWindow />} />
//       <Route path='/item/anime/:id' element={<FilmWindow />} />
//       <Route path='/item/cartoon/:id' element={<FilmWindow />} />
//       <Route path='/item/animated-series/:id' element={<FilmWindow />} />
//       <Route path='/item/tv-series/:id' element={<FilmWindow />} />
//       <Route path='/item/game/:id' element={<GameWindow />} />
//       <Route path='/item/book/:id' element={<BookWindow />} />
//       <Route path='/discuss' element={<ItemDiscussWindow />} />
//       <Route path='/franchise' element={<FranchiseWindow />} />
//       {/* <Route path='/register' element={<Registration/>}/> */}
//       <Route path='/auth' element={<Authorize />} />
//     </Route>
//   )
// )

function App() {

  const dispatch = useAppDispatch();

  const selectIsAuth = useAppSelector((state) => state.authData.data);
  console.log(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  const userId = (useAppSelector((state) => state.authData.data?._id));
  const userNick = (useAppSelector((state) => state.authData.data?.nick));
  console.log(userId, userNick);
  return (

    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Welcome />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile/:nick' element={<Profile />} />
          <Route path='/item/movie/:id' element={<FilmWindow />} />
          <Route path='/item/anime/:id' element={<FilmWindow />} />
          <Route path='/item/cartoon/:id' element={<FilmWindow />} />
          <Route path='/item/animated-series/:id' element={<FilmWindow />} />
          <Route path='/item/tv-series/:id' element={<FilmWindow />} />
          <Route path='/item/game/:id' element={<GameWindow />} />
          <Route path='/item/book/:id' element={<BookWindow />} />
          <Route path='/discuss/:itemId/:discussId' element={<ItemDiscussWindow />} />
          <Route path='/franchise' element={<FranchiseWindow />} />
          <Route path='/auth' element={<Authorize />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
