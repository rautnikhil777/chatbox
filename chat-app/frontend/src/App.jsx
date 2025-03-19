import React, { useState } from 'react'; // Duplicate import hataya
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/chat" element={token ? <ChatBox /> : <Navigate to="/login" />} />
                {/* Default route ko redirect karo agar koi invalid URL ho */}
                <Route path="*" element={<Navigate to={token ? "/chat" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
