import LogoSite from "../Logo.png"
import { useState } from 'react';
import styled from "styled-components"
import { Link, useHistory } from 'react-router-dom';
import axios from "axios"
import Loader from "react-loader-spinner";


export default function Register(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [press, setPress] = useState(false);
    let history = useHistory();

    function Register(){
        setPress(true);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
        request.then(() => {
            history.push("/")
        });
        request.catch(() => {
            alert("Alguma informação digitada não foi aceita, por favor verifique os campos!")
            setPress(false);
        });
    }

    const body ={
        email,
        name,
        image,
        password
    }

    return(
        <Container>
            <Img src={LogoSite}></Img>
            <Input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={press}></Input>
            <Input type="password" placeholder="senha" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={press}></Input>
            <Input type="text" placeholder="nome" value={name} onChange={(e)=>setName(e.target.value)} disabled={press}></Input>
            <Input type="text" placeholder="foto" value={image} onChange={(e)=>setImage(e.target.value)} disabled={press}></Input>
            <Button onClick={()=>Register()}> {press === true ? <Loader type="ThreeDots" color="#FFF" height={45} width={60}/> : "Cadastrar"}</Button>
            <Link to={"/"}>
                <AlreadyHave>Já tem uma conta? Faça login!</AlreadyHave>
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
        &:disabled{
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

const AlreadyHave = styled.p`
    cursor: pointer;
    margin-top: 20px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
`