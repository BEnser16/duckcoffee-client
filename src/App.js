import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

function App() {
  const useritem = useSelector((state) => state.user);
  console.log("here is useritem: ", useritem);
  

  return (
    <>
        <div className="App"></div>
    </>
  );
}

export default App;
