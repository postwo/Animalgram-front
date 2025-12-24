import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SingupPage';
import AdminPage from './pages/AdminaPage';

function App() {
  return (
    // 각 페이지 적용
    <Router>
      <Navbar />
      <div style={{ paddingTop: '40px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
