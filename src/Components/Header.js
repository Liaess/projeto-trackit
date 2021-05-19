import styled from "styled-components";
import React, { useContext } from 'react';
import UserContext from "../Context/UserContext";

export default function Header(){
    const {user} = useContext(UserContext);
    return(
    <HeaderApp>
        <h1>TrackIt</h1>
        <img src={user.image} alt={user.name}></img>
    </HeaderApp>
    )
}
const HeaderApp = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    top: 0;
    background-color: #126BA5;
    color: #FFF;
    font-family: 'Playball';
    font-size: 38px;
    box-shadow: 0px 4px 4px rgba(0,0,0, 0.3);
    h1{
        margin-left: 20px;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 50px;
        margin-right: 20px;
    }
`