import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./CSS/reset.css";
import Login from "./Components/Login"
import Register from "./Components/Register"
import Habitos from "./Components/Habitos"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App(){
    return(
        <>
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
            </Switch>
        </BrowserRouter>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));