import * as React from "react";
import TopNavBar from "./components/top-navbar";
import Footer from "./components/footer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/home-page";
import MenuPage from "./pages/menu-page";
import CartPage from "./pages/cart-page";
import LoginPage from "./pages/log-in-page";
import RegisterPage from "./pages/register-page";
import ForgotPassPage from "./pages/forgot-pass-page";
import OrderConfPage from "./pages/order-confirmation-page";
import MenuBakeryPage from "./pages/menu-bakery";

function App() {
    return (
        <Router>
            <TopNavBar/>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/menu" component={MenuPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/cart" component={CartPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/forgotpass" component={ForgotPassPage}/>
                <Route path="/orderconfirmation" component={OrderConfPage}/>
                <Route path="/menu_bakery" component={MenuBakeryPage}/>
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;
