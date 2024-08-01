// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Login from "./auth/Login";
import Registration from "./auth/Register";
import TrelloBoard from "./components/trelloBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./AuthLayout/AuthLayout";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >

            <Route path="/" element={<ProtectedRoute>
              <TrelloBoard />
            </ProtectedRoute>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
