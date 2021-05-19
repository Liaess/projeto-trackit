import { useState } from 'react';
import LogoSite from "../Logo.png"
import styled from "styled-components"
import { Link, useHistory } from 'react-router-dom';
import axios from "axios"
import Loader from "react-loader-spinner";
import React, { useContext } from 'react';
import UserContext from "../Context/UserContext";


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [press, setPress] = useState(false);
    const {setUser} = useContext(UserContext);

    let history = useHistory();

    const body ={
        email,
        password
    } 

    function Verify(){
        setPress(true);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
        request.then(response => {
            setUser(response.data)
            history.push("/habitos");
        });
        request.catch((error)=> {
            setEmail("");
            setPassword("");
            setPress(false);
            if(error.response.status === 401){
                alert("Usuário e/ou senha inválidos!")
            } else if (error.response.status === 422) {
                alert("Email inválido");
            } else{
                alert("Ocorreu um erro!");
            }
        })
    }

    return(
        <Container>
            <Img src={LogoSite} alt="logo"></Img>
            <Input type="text" placeholder="email" value={email} onKeyPress={(e)=>{if(e.code==="Enter"){Verify()}}} onChange={(e)=>setEmail(e.target.value)} disabled={press}></Input>
            <Input type="password" placeholder="senha" onKeyPress={(e)=>{if(e.code==="Enter"){Verify()}}} value={password} onChange={(e)=>setPassword(e.target.value)} disabled={press}></Input>
            <Button onClick={Verify}> {press === true ? <Loader type="ThreeDots" color="#FFF" height={45} width={60}/> : "Entrar" } </Button>
            <Link to="/cadastro">
                <Register>Não tem uma conta? Cadastre-se!</Register>
            </Link>
        </Container>
    )
}

const Img = styled.img`
    width:50%;
    margin-top: 80px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
`
const Input = styled.input`
    height: 45px;
    width: 70%;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #AFAFAF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-bottom: 6px;
    padding-left: 10px;
    font-family: 'Lexend Deca', sans-serif;
        ::-webkit-input-placeholder{
            color: #DBDBDB;
        }
        :disabled{
            background-color: #F2F2F2;
        }
`

const Button = styled.button`
    cursor: pointer;
    height: 45px;
    width: 70%;
    background-color: #52B6FF;
    border: none;
    font-family: 'Lexend Deca', sans-serif;
    border-radius: 5px;
    color: #FFF;
    font-size: 21px;
`

const Register = styled.p`
    cursor: pointer;
    margin-top: 20px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
`