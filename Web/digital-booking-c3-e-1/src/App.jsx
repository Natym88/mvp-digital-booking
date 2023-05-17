import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
//import "typeface-roboto";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
