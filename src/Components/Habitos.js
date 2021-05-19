import styled from "styled-components";
// import React, { useContext } from 'react';
// import UserContext from "../Context/UserContext";
import { useState } from 'react';
import Header from "./Header"
import Footer from "./Footer"


export default function Habitos(){
    const [habit, setHabit] = useState(false);
    const [inputHabit, setInputHabit] = useState("");
    // const {user} = useContext(UserContext);
    const eachDay = ['D','S','T','Q','Q','S','S'];
    
    return(
        <Container>
            <Header />            
            <Menu>
                <p>Meus hábitos</p>
                <button onClick={()=>setHabit(true)}>+</button>
            </Menu>
            <CreateHabit display = {habit}>
                <Input placeholder="nome do hábito" value={inputHabit} onChange={(e)=>setInputHabit(e.target.value)}></Input>
                <Week>
                    {eachDay.map((d,i)=>
                        <EachDay key={i}>{d}</EachDay>
                    )}
                </Week>
                <Buttons>
                    <Cancel onClick={()=>{setHabit(false);setInputHabit("")}}>Cancelar</Cancel>
                    <Save>Salvar</Save>
                </Buttons>
            </CreateHabit>
            <Habits>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Habits>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    height: 100vh;
`

const Menu = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: 'Lexend Deca', sans-serif;
    p{
        color: #126BA5;
        font-size: 23px;
        margin-left: 20px;
        margin-top: 105px;
    }
    button{
        margin-right: 17px;
        border: none;
        background-color: #52B6FF;
        font-size: 27px;
        color: #FFF;
        width: 35px;
        height: 35px;
        border-radius: 5px;
        margin-top: 100px;
    }
`

const CreateHabit = styled.div`
    position: relative;
    width: 340px;
    height: 180px;
    background-color: #FFF;
    display: ${props => (props.display === true ? "flex" : "none")};
    flex-direction: column;
    justify-content: center;
    margin: 15px auto 0px auto;
    border-radius: 5px;
`

const Input = styled.input`
    height: 45px;
    width: 303px;
    font-family: 'Lexend Deca', sans-serif;
    margin: -45px auto;
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

`

const Week =styled.div`
    display: flex;
    margin-top: 10px;
    margin-left: 18px;
`

const EachDay = styled.div`
    width: 30px;
    height: 30px;
    background-color: #fff;
    font-family: 'Lexend Deca', sans-serif;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    color: #DBDBDB;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin: 0px 2px;
`

const Habits = styled.div`
    margin-top: 30px;
    font-family: 'Lexend Deca', sans-serif;
    p{
        color: #666;
        font-size: 18px;
        margin: 0px 20px;
    }
`

const Buttons = styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 15px;
`

const Cancel = styled.button`
    width: 84px;
    height: 35px;
    cursor: pointer;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    color: #52B6FF;
    margin-right: 5px;
`

const Save = styled.button`
    width: 84px;
    height: 35px;   
    cursor: pointer; 
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    color: #fff;
`