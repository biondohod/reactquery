import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Todos from "./components/Todos";
import Projects from "./components/Projects";
import Products from "./components/Products";

function App() {
  return (
    <>
      {/* <Todos />  */}
      {/* <Projects /> */}
      <Products/>
    </>
  );
}

export default App;
