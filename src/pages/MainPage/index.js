import React from 'react'
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Row from '../../components/Row';
import styled from 'styled-components';
import requests from '../../api/requests';

const MainPage = () => {
    return (
        <Container>
            <Nav/>
            <Banner/>
            <Category/>
            <Row title="현재 가장 인기있는"   id="TN" fetchURL={requests.fetchTrending}/>
            <Row title="최고 평점"            id="TR" fetchURL={requests.fetchTopRated}/>
            <Row title="액션"                 id="AM" fetchURL={requests.fetchActionMovies}/>
            <Row title="코미디"               id="CM" fetchURL={requests.fetchComedyMovies}/>
            <Row title="다큐멘터리"           id="DC" fetchURL={requests.fetchDocumentaries}/>
            <Row title="음악"                 id="MU" fetchURL={requests.fetchMusic}/>
        </Container>
      );
}

export default MainPage

// Style Component
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display : block;
  top : 72px;
  padding : 0 calc(3.5vw - 5px);

  &: after{
    background : url("/images/home-background.png") center center / cover no-repeat fixed;
    content : "";
    position : absolute;
    inset : 0;
    opacity :1;
    z-index :-1;
  };
`