import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

export default function History(){
    return(
<>
    <Header />
        <Container>
            <Message>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Message>
        </Container>
    <Footer />
</>


    )
}

const Message = styled.div`
    padding-top: 90px;
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
    background-color: #E5E5E5;
`