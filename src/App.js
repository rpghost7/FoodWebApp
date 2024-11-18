
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';

function App() {
  return (
  <>
  <div className='bg-indigo-900'>
  <Routes>
    <Route path='/' element={<Navbar></Navbar>}>
    <Route path="home" element={<Home />} />
    <Route path="contact" element={<Contact />} />
    <Route path="log-in" element={<Login />} />
    </Route>
  </Routes>
  </div>
  </>
  );
}

export default App;
