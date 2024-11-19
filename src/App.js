import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';

function App() {
  return (
    <div className='bg-gray-950 h-screen'>
      <Routes>
      
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} /> 
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="log-in" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

