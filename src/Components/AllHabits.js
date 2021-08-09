import styled from "styled-components";
import React, { useContext, useEffect } from 'react';
import UserContext from "../Context/UserContext";
import { useState } from 'react';
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios";
import Loader from "react-loader-spinner";
import { TrashOutline } from 'react-ionicons'
import Loading from "./Loading"


export default function AllHabits(){
    const [showHabit, setShowHabit] = useState(false);
    const [inputHabit, setInputHabit] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [createdHabit, setCreatedHabit] = useState(null);
    const [press, setPress] = useState(false);
    const {user} = useContext(UserContext);
    const eachDay = ['D','S','T','Q','Q','S','S'];


    const body = {
        name: inputHabit,
        days: selectedDays
    }

    useEffect(()=>{
        const config ={
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response)=>{setCreatedHabit(response.data)})
    },[]) //eslint-disable-line

    function GetHabits(){
        const config ={
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response)=>{setCreatedHabit(response.data)})
    }
    
    function SelectDay(id){
        if(selectedDays.includes(id)){
            const newarray = selectedDays.filter((each)=> each !== id)
            setSelectedDays([...newarray]);
        }else{
            const isSelected = [...selectedDays, id];
            setSelectedDays(isSelected);
        }
    }

    function SaveHabits(){
        if(inputHabit.length === 0){
            alert("O nome do hábito não pode ser vázio!")
            return
        }
        if(selectedDays.length === 0){
            alert("Selecione pelo menos um dia da semana!");
            return
        }
        setPress(true)
        const config ={
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        request.then(()=>{GetHabits();setPress(false);setShowHabit(false);setInputHabit("");setSelectedDays([])})
        request.catch(()=>{setInputHabit("");setPress(false);setSelectedDays([])})
    }

    function Delete(i){
        const config ={
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        };

        const ask = window.confirm("Deseja deletar esse hábito?");
        if(ask){
            const deleteHabit = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${i}`,config)
            deleteHabit.then(()=>GetHabits());
        }
    }

    if(!createdHabit) return <Loading />

    return(
        <Container>
            <Header />            
            <Menu>
                <p>Meus hábitos</p>
                <button onClick={()=>setShowHabit(true)}>+</button>
            </Menu>
            <CreateHabit show = {showHabit}>
                <Input disabled={press} placeholder="nome do hábito" value={inputHabit} onChange={(e)=>setInputHabit(e.target.value)} onKeyPress={(e)=>{if(e.code==="Enter"){SaveHabits()}}}></Input>
                <Week>
                    {eachDay.map((d,i)=>
                        <EachDay disabled={press} className={selectedDays.includes(i) ? "selected" : ""} onClick={()=>{SelectDay(i)}} key={i} id={i}>{d}</EachDay>
                    )}
                </Week>
                <Buttons>
                    <Cancel onClick={()=>{setShowHabit(false)}}>Cancelar</Cancel>
                    <Save onClick={()=>{SaveHabits()}} >{press === true ? <Loader type="ThreeDots" color="#FFF" height={35} width={50}/> : "Salvar" }</Save>
                </Buttons>
            </CreateHabit>
            <Habits>
                {!createdHabit || createdHabit.length < 1 ? <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1> : 
                createdHabit.map((h,i)=>
                    <EachHabit key={i}> 
                        <p>{h.name}</p>
                        <EachDayHabit>
                        {eachDay.map((d,j)=>
                            <EachDay key={j} className={h.days.includes(j) ? "selected" : ""} >{d}</EachDay>
                        )}
                        </EachDayHabit>
                        <TrashOutline color={'#424242'} title={"trashcan"} height="15px" width="25px" cssClasses={"position"} onClick={()=>Delete(h.id)} />
                    </EachHabit>
                ).reverse()}
            </Habits>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
`

const Menu = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    font-family: 'Lexend Deca', sans-serif;
    padding-top: 105px;
    p{
        color: #126BA5;
        font-size: 23px;
        margin-left: 20px;
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
    }
`

const CreateHabit = styled.div`
    position: relative;
    width: 340px;
    height: 180px;
    background-color: #FFF;
    display: ${props => (props.show === true ? "flex" : "none")};
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
        :disabled{
            background-color: #F2F2F2;
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
    &.selected{
        background-color: #CFCFCF;
        color: #fff;
    }
`

const Habits = styled.div`
    margin-top: 30px;
    font-family: 'Lexend Deca', sans-serif;
    padding-bottom: 100px;
    h1{
        color: #666;
        font-size: 18px;
        margin: 0px 20px;
    }
    p{
        color: #666;
        font-size: 20px;
        padding: 10px;
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

const EachHabit = styled.div`
    width: 340px;
    background-color: #fff;
    height: 91px;
    border-radius: 5px;
    margin: 10px auto;
    position: relative;
    .position{
        position: absolute;
        right: 1px;
        top: 6px;
    }
`

const EachDayHabit = styled.div`
    display: flex;
    padding-left: 8px;
`