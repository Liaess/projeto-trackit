import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import axios from "axios";
import Loading from "./Loading"


export default function History(){
    const [useLoading, setUseLoading] = useState(true)
    const {user} =useContext(UserContext);

    useEffect(()=>{
        const config ={
            headers:{
                "Authorization": `Bearer ${user.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config)
        promise.then((response)=> {console.log(response.data);setUseLoading(false)})
    },[])

    if(useLoading) return <Loading />


    return(
        <>
            <Header />
                <Container>
                    <Message>
                        <h1>Histórico</h1>
                        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                    </Message>
                        {/* <Calendar className={"MyCalendar"}
                            locale={"pt-br"}
                        /> */}
                </Container>
            <Footer />
        </>


    )
}

const Message = styled.div`
    padding-top: 105px;
    top:0;
    left:0;
    font-family: 'Lexend Deca', sans-serif;
    h1{
        color: #126BA5;
        font-size: 23px;
        margin-left: 20px;
    }
    p{
        margin-top: 20px;
        margin-left: 20px;
        font-size: 18px;
        color: #666
    }
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F2F2F2;
    /* .MyCalendar{
        margin: 0px auto;
    } */
`
