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
import { Welcome } from './Components/RegistrationPage/Welcome'
import { ErrorBoundary } from './Components/ErrorPage'
import { FullPost } from './Components/Posts/FullPost'
import { AddPost } from './Components/Posts/AddPost'

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

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
          
          <Route path='/post/:postId' element={<FullPost/>} />
          <Route path='/post/:postId/edit' element={<AddPost/>} />
          <Route path='/post/add' element={<AddPost/>} />
          
          <Route path='/auth' element={<Authorize />} />
          <Route path='/error' element={<ErrorBoundary/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
