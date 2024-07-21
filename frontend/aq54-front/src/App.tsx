
import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './components/signin'
import SignUp from './components/signup'
import MainPage from './pages/mainPage';

function App() {
  

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route path="/mainpage" element={<MainPage/>}/>
      

      </Routes>


    </Router>
    
     
    
  )
}

export default App
