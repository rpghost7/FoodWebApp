import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import OrderSummary from './OrderSummary';

// tailwind is in the css file

function App() {
  return (
   
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="log-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path='/order-summary' element={<OrderSummary/>}/>
      </Routes>
    </div>

  );
}

export default App;

