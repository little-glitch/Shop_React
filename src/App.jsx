import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Nav from './componets/Nav'
import Details from './pages/Details'
import Cart from './pages/Cart'

import {BrowserRouter,Routes,Route} from'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [search,setSearch]=useState("")
  console.log(search)
  
  return (
    <>
    
     <BrowserRouter>
     <Nav setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home search={search}/>}/>
        <Route path='/Details/:id' Component={Details}/>
        <Route path='/Cart' Component={Cart}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
