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
import Loading from "./Loading"


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
        promise.then((response)=>{setTodayHabit(response.data)})
    }, [])

    if(todayHabit.length === 0){
        return(
            <>
                <Loading />
            </>
        )
    }

    function UpdateHabits(){
        const config = {
            headers:{
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise.then((response)=>{setTodayHabit(response.data)})

    }
    
    function ChangeDone(e,d){
        e.stopPropagation();

        if(d.done === false){
            const config ={
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }

            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${d.id}/check`, {} , config)
            promise.then(()=> {UpdateHabits()})
            
        }else{
            const config ={
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }           
            
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${d.id}/uncheck`, {} , config)
            promise.then(()=> {UpdateHabits()})
        
        }
    }

    return(
        <Container>
            <Header />
            <Time>
                {dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}
                <p>Nenhum hábito concluído ainda</p>
            </Time>
            <HabitContainer>
                {todayHabit.map((d,i)=>
                    <EachHabit onClick={(e)=>ChangeDone(e,d)} key={i}>
                        {d.name}
                        <p>Sequência atual: {d.currentSequence} dias</p>
                        <p>Seu recorde: {d.highestSequence} dias</p>
                        <Check  done={d.done}><CheckmarkOutline cssClasses={"position"} color={'#FFF'} title={"checkMark"} height="60px" width="60px"/></Check>
                    </EachHabit>
                ).reverse()}
            </HabitContainer>
            <Footer />
        </Container>
    )
}



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

`
const Check = styled.div`
    position: absolute;
    width: 69px;
    height: 69px;
    right: 15px;
    top: 13px;
    border: none;
    border-radius: 5px;
    background-color: ${props => (props.done === true ? "#8FC549" : "#EBEBEB")};
    .position{
        position: absolute;
        right: 4px;
        top: 5px;
    }
`

const HabitContainer = styled.div`
    padding-bottom: 115px;
`