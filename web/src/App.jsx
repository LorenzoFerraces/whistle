import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Create from './routes/Create';
import Tournaments from './routes/Tournaments';
import Tournament from './routes/Tournament';
import { Private } from './routes/Private';
import NotFound from './routes/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Tournaments />
            </Private>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            <Private>
              <Create />
            </Private>
          }
        />
        <Route
          path="/tournaments"
          element={
            <Private>
              <Tournaments />
            </Private>
          }
        />
        <Route
          path="/tournament/:tournamentId"
          element={
            <Private>
              <Tournament />
            </Private>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
