import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Create from './routes/Create';
import Tournaments from './routes/Tournaments';
import Tournament from './routes/Tournament';
import Menu from './components/menu/Menu';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournament/:tournamentId" element={<Tournament />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
