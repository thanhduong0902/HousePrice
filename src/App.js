import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import HomeView from "./HoneView/HomeView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/HomeView" element={<HomeView />} />
      </Routes>
    </div>
  );
}

export default App;
