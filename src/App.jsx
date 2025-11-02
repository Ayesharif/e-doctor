import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import UploadReport from './pages/uploadReport'
import AddVitals from './pages/addVitals'
import Layout from './layouts/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>

<Route path='/' element={<Layout/>}>
<Route index element={<Dashboard/>}/>
<Route path='login' element={<Login/>} />
<Route path='register' element={<Register/>} />
<Route path='uploadreport' element={<UploadReport/>} />
<Route path='addvitals' element={<AddVitals/>} />
</Route>
</Routes>
    </>
  )
}

export default App
