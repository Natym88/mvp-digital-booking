import React from "react";
import "./App.css";
import { UserDataContext } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import MainPage from "./components/mainPage/MainPage";
import FavsList from "./components/products/favs/FavsList";

function App() {
  return (
    <>
      <UserDataContext>
        <Header />
        <MainPage />
        <Footer />
      </UserDataContext>
    </>
  );
}

export default App;
