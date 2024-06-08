import logo from './logo.svg';
import './App.css';

// firebase----------
import app from './firebase'

// api---------
import requests from './api/requests';

// components---------
import Nav from './components/Nav';
import Banner from './components/Banner';
import styled from 'styled-components';
import Category from './components/Category';
import Row from './components/Row';

// Pages---------
import LoginPage from  './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import MainPage from   './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { Outlet, Route, Routes } from 'react-router-dom';


const Layout = () =>{
    return(
        <div>
            <Nav/>

            <Outlet/>
        </div>
    )
}


function App() {
  return (
    <div className='app'>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<LoginPage/>} />
                <Route path='main' element={<MainPage/>} />
                <Route path=':movieId' element={<DetailPage/>} />
                <Route path='search' element={<SearchPage/>} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;


