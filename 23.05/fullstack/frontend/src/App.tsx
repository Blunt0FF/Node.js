import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Posts from './components/pages/Posts'
import About from './components/pages/About'
import Home from './components/pages/Home'
import AuthForm from './components/pages/AuthForm'


function App() {


  return (
    <>
      <Header/>
      <main>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/signup" element={<AuthForm />} />
         </Routes>
      </main>
    </>
  )
}

export default App
