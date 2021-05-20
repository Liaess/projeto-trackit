import styled from "styled-components";
import Header from "./Header"
import Footer from "./Footer"
import UserContext from "../Context/UserContext";
import { useContext, useEffect } from "react";
import dayjs from "dayjs";
import { useState } from "react"
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/pt";
import { CheckmarkOutline } from 'react-ionicons'
import axios from "axios";
import loading from "../loading.gif"


export default function Today(){
    dayjs.extend(calendar);
    const [todayHabit, setTodayHabit] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(()=>{
        const config = {
            headers:{
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise.then((response)=>{setTodayHabit(response.data); console.log(response.data)})
    }, [])

    if(todayHabit.length === 0){
        return(
            <>
                <Header />
                <ContainerLoading>
                    <img className="loading" src={loading} alt="loading"></img>
                </ContainerLoading>
                <Footer />
            </>
        )
    }

    return(
        <Container>
            <Header />
            <Time>
                {dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}
                <p>Nenhum hábito concluído ainda</p>
            </Time>
            {!todayHabit || todayHabit.length < 1 ? "" : 
                todayHabit.map((d,i)=>
                    <EachHabit>
                        {d.name}
                        <p>Sequência atual: {d.currentSequence} dias</p>
                        <p>Sequência atual: {d.highestSequence} dias</p>
                        <button><CheckmarkOutline color={'#FFF'} title={"checkMark"} height="60px" width="60px"/></button>
                    </EachHabit>
                ).reverse()
            }
            <Footer />
        </Container>
    )
}

const ContainerLoading = styled.div`
    position: relative;
    background-color: #F2F2F2;
    min-height: 100vh;
    img{
        position: absolute;
        top: 233px;
        right: 88px;
    }
`

const Container = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
`

const Time = styled.div`
    padding-top: 95px;
    color: #126BA5;
    font-size: 23px;
    margin-left: 20px;
    font-family: 'Lexend Deca', sans-serif;
    p{
        color: #BABABA;
        font-size: 18px;
        padding-top: 5px;
    }
`
const EachHabit =styled.div`
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 94px;
    background-color: #fff;
    margin: 10px auto 0px auto;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    color: #666;
    font-size: 20px;
    padding: 10px 0px 0px 15px;
    position: relative;
    p{
        font-size: 13px;
        padding: 2px;
    }
    p:first-child{
        padding-top: 15px;
    }
    button{
        position: absolute;
        width: 69px;
        height: 69px;
        right: 15px;
        top: 13px;
        border: none;
        border-radius: 5px;
        background-color: #EBEBEB;
    }

`