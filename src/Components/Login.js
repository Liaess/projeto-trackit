import { useEffect, useState } from "react";
import LogoSite from "../Logo.png";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import React, { useContext } from "react";
import UserContext from "../Context/UserContext";

export default function Login() {
  const [press, setPress] = useState(false);
  const { setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      userInfo.email = value;
      setUserInfo({ ...userInfo });
    } else {
      userInfo.password = value;
      setUserInfo({ ...userInfo });
    }
  }

  useEffect(() => {
    if (localStorage.length) {
      userInfo.email = JSON.parse(localStorage.userdata).email;
      userInfo.password = JSON.parse(localStorage.userdata).password;
      Verify();
    }
  }, []); //eslint-disable-line

  function Verify() {
    setPress(true);
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      userInfo
    );
    request.then((response) => {
      if (!localStorage.length)
        localStorage.setItem("userdata", JSON.stringify(userInfo));
      setUser({
        id: response.data.id,
        name: response.data.name,
        token: response.data.token,
        image: response.data.image,
      });
      history.push("/hoje");
    });
    request.catch((error) => {
      setPress(false);
      if (error.response.status === 401) {
        alert("Usuário e/ou senha inválidos!");
      } else if (error.response.status === 422) {
        alert("Email inválido");
      } else {
        alert("Ocorreu um erro!");
      }
    });
  }

  return (
    <Container>
      <Img src={LogoSite} alt="logo"></Img>
      <Input
        type="text"
        name="email"
        placeholder="email"
        value={userInfo.email}
        onKeyPress={(e) => {
          if (e.code === "Enter") {
            Verify();
          }
        }}
        onChange={handleChange}
        disabled={press}
      ></Input>
      <Input
        type="password"
        name="password"
        placeholder="senha"
        onKeyPress={(e) => {
          if (e.code === "Enter") {
            Verify();
          }
        }}
        value={userInfo.password}
        onChange={handleChange}
        disabled={press}
      ></Input>
      <Button disabled={press} onClick={Verify}>
        {" "}
        {press === true ? (
          <Loader type="ThreeDots" color="#FFF" height={45} width={60} />
        ) : (
          "Entrar"
        )}{" "}
      </Button>
      <Link to="/cadastro">
        <Register>Não tem uma conta? Cadastre-se!</Register>
      </Link>
    </Container>
  );
}

const Img = styled.img`
  width: 50vw;
  margin-top: 80px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  height: 45px;
  width: 70vw;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  color: #afafaf;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  margin-bottom: 6px;
  padding-left: 10px;
  font-family: "Lexend Deca", sans-serif;
  ::-webkit-input-placeholder {
    color: #dbdbdb;
  }
  :disabled {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  cursor: pointer;
  height: 45px;
  width: 70vw;
  background-color: #52b6ff;
  border: none;
  font-family: "Lexend Deca", sans-serif;
  border-radius: 5px;
  color: #fff;
  font-size: 21px;
  :disabled {
    opacity: 0.7;
  }
`;

const Register = styled.p`
  cursor: pointer;
  margin-top: 20px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 14px;
  color: #52b6ff;
`;
