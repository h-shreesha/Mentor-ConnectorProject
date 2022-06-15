import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Mentor from './pages/Mentor/Mentor';
import Mentee from './pages/Mentee/Mentee';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';
import Forgotpassword from './pages/Forgotpassword';
import RegisterType from './pages/RegisterType';
import MenteeRegister from './pages/MenteeRegister';
import MentorRegister from './pages/MentorRegister';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<RegisterType />} />
      <Route exact path="/mentorregister" element={<MentorRegister />} />
      <Route exact path="/menteeregister" element={<MenteeRegister />} />
      <Route exact path="/forgotpassword" element={<Forgotpassword />} />
      <Route exact path="/mentor/*" element={<Mentor />} />
      <Route exact path="/mentee/*" element={<Mentee />} />
      <Route exact path="/admin" element={<AdminLogin />} />
      <Route exact path="/admin/home/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
