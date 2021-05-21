import Header from "./Header"
import Footer from "./Footer"
import loading from "../loading.gif"
import styled from "styled-components"
export default function Loading(){
    
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