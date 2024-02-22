import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'  
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element = {<Home/ >}></Route>
            <Route path="/about" element = {<About/ >}></Route>
            <Route path="/sign-in" element = {<SignIn/ >}></Route>
            <Route path="/sign-up" element = {<SignUp/ >}></Route>
            <Route element = {<PrivateRoute/>}>
                <Route path="/dashboard" element = {<Dashboard/ >}></Route>
            </Route>
            <Route path="/projects" element = {<Projects/ >}></Route>
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
