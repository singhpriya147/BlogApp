
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';

import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
function App() {
  

  return (
    <>
      <Router>
   
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        
        </Routes>
      </Router>
    
    </>
  );
}

export default App
