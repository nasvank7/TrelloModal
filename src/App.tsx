// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Login from "./auth/Login";
import Registration from "./auth/Register";
import TrelloBoard from "./components/trelloBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TrelloBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
