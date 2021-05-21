import { Link } from 'react-router-dom';
import styled from "styled-components";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import ProgressContext from '../Context/ProgressContext';
import { useContext } from 'react';

export default function Footer(){
    const { progress } = useContext(ProgressContext);

    return(
        <Bottom>
            <Link to={"/habitos"}>
                <p>Hábitos</p>
            </Link>
            <Link to={"/hoje"}>
                <Circle>
                <CircularProgressbar
                    value={progress*100}
                    text={"Hoje"}
                    minValue={0}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                    })}
                />
                </Circle>
            </Link>
            <Link to={"/historico"}>
                <p>Histórico</p>
            </Link>
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
    width: 100vw;
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