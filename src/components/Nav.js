import { getAuth,GoogleAuthProvider,onAuthStateChanged,signInWithPopup, signOut } from 'firebase/auth';
import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Nav = () => { 

    // 인스턴스
    const initialUserData = localStorage.getItem("userData") ?
        JSON.parse(localStorage.getItem("userData")) : {};
    const [show,setShow] = useState(false);
    const {pathname} = useLocation();
    const [seachValue, setSeachValue] = useState("")
    const navigate = useNavigate()
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [userData,setUserData] = useState(initialUserData);


    // useEffect 부분
    useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
            if(user){
                if(pathname === "/"){
                    navigate("/main")
                }
            }else{
                navigate("/")
            }
        });
    }, [auth,navigate,pathname])


    // useEffect 부분
    useEffect(() => {
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 50){
                setShow(true)
            }else{
                setShow(false)
            }
        })
      return () => {
        window.removeEventListener('scroll',handleScroll);
      }
    }, [])


    // 핸들러 - 기능함수
    const handleScroll = () => {
        if(window.scrollY > 50){
            setShow(true)
        }else{
            setShow(false)
        }
    };

    const handleChage = (e) => {
        setSeachValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    };

    const handleAuth = () => {
        signInWithPopup(auth,provider)
        .then(result=>{
            setUserData(result.user)
            localStorage.setItem("userData",JSON.stringify(result.user));
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSignOut = () =>{
            signOut(auth)
                .then (()=>{
                    setUserData({})
                    navigate("/")
                })
                .catch((error) =>{
                    console.log(error)
                })
    }

// HTML리턴 부분
  return (
    <NavWrapper show={show}>
        <Logo>
            <img 
            alt="Disney Plus Logo" 
            src="/images/logo.svg" 
             onClick={() => (window.location.href = "/")}
            />
        </Logo>
        {pathname === "/" ? 
        (<Login onClick={handleAuth}>Login</Login>) : 
        <div>
            <Input 
                value={seachValue}
                onChange={handleChage}
                className='nav_input' 
                type='text' 
                placeholder='컨텐츠를 검색...'/>
            <SignOut>
                <UserImg src={userData.photoURL} alt={userData.displayName}/>
                <DropDown>
                    <span onClick={handleSignOut}>Sign Out</span>
                </DropDown>
            </SignOut>
        </div>
        
        }
    </NavWrapper>
  )
}


// 현재파일 수출
export default Nav


// 스타일적용
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;



const Login = styled.a`
    background-color :rgba(0,0,0, 0.6);
    padding :8px 16px;
    text-transform: uppercase;
    letter-spacing :1.5px;
    border :1px solid #f9f9f9;
    transition : all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color : #f9f9f9;
        color : gray;
        border-color : transparent;
    }


`;
const Input = styled.input`
    position : fixed;
    left :50%;
    transform : translate(-50%, 0);
    background-color :rgba(0,0,0, 0.582);
    border-radius : 5px;
    color : white;
    padding :5px;
    border :none;

`;

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height : 70px;
    background-color : ${props => props.show ? "#090b13" : "transparent"};
    display: flex;
    justify-content : space-between;
    align-items : center;
    padding :0 36px;
    letter-spacing :16px;
    z-index :3;


`;

const Logo = styled.a`
    padding : 0;
    width :80px;
    margin-top : 4px;
    max-height : 70px;
    font-size :0;
    display : inline-block;
    cursor: pointer;

    img{
        display : block;
        width :100%
    }
`
