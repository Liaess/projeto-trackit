import { Link } from 'react-router-dom';
import styled from "styled-components";
import { CircularProgressbar } from 'react-circular-progressbar';

export default function Footer(){
    return(
        <Bottom>
            <Link to={"/habitos"}>
                <p>Hábitos</p>
            </Link>
            <Circle>
                <CircularProgressbar background={true} text="Hoje" />
            </Circle>
            {/* <Link to={"/historico"}> */}
                <p>Histórico</p>
            {/* </Link> */}
        </Bottom>
    )
}

const Bottom = styled.div`
    position: fixed;
    display: flex;
    bottom: 0;
    background-color: #FFF;
    font-family: 'Lexend Deca', sans-serif;
    align-items: center;
    color: #52B6FF;
    justify-content: space-between;
    font-size: 18px;
    height: 70px;
    width: 100%;
    p{
        color: #52B6FF;
        margin-right: 25px;
        margin-left: 25px;
    }
`
const Circle = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 35px;
`