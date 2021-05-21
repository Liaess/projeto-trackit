import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./CSS/reset.css"
import Login from "./Components/Login";
import Register from "./Components/Register";
import AllHabits from "./Components/AllHabits";
import History from "./Components/History";
import Today from "./Components/Today";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserContext from "./Context/UserContext";
import 'react-circular-progressbar/dist/styles.css';
import ProgressContext from "./Context/ProgressContext";


function App(){
    const [user, setUser] = useState(null)
    const [progress, setProgress] = useState(null)

    return(
        <ProgressContext.Provider value={{progress, setProgress}}>
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
                            <AllHabits />
                        </Route>
                        <Route path="/hoje" exact>
                            <Today />
                        </Route>
                        <Route path="/historico" exact>
                            <History />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </UserContext.Provider>
        </ProgressContext.Provider>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));