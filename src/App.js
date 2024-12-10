import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider> {/* Wrap the application in the UserProvider */}
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
      </Routes>
    </div>
  </UserProvider>
  );
}

export default App;

