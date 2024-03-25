import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Todos from "./components/Todos";
import Projects from "./components/Projects";

function App() {
  return (
    <>
      {/* <Todos />  */}
      <Projects />
    </>
  );
}

export default App;
