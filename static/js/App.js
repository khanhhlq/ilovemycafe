import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Room from "./components/Room";

function App() {
  return (
    <RecoilRoot>
      <Room />
    </RecoilRoot>
  );
}

export default App;
