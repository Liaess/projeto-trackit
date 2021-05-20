import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./CSS/reset.css"
import Login from "./Components/Login";
import Register from "./Components/Register";
import Habitos from "./Components/Habitos";
import History from "./Components/History";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserContext from "./Context/UserContext";
import 'react-circular-progressbar/dist/styles.css';


function App(){
    const [user, setUser] = useState(null)
    return(
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/cadastro" exact>
                        <Register />
                    </Route>
                    <Route path="/habitos" exact>
                        <Habitos />
                    </Route>
                    <Route path="/historico" exact>
                        <History />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));