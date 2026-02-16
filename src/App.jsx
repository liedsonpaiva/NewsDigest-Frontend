import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";
import Sources from "./pages/Sources";
import Subscriptions from "./pages/Subscriptions";
import UserSettings from "./pages/UserSettings";
import './App.css'

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Cadastro</Link>
        <Link to="/sources" style={{ marginRight: 10 }}>Fontes</Link>
        <Link to="/subscriptions" style={{ marginRight: 10 }}>Assinaturas</Link>
        <Link to="/settings">Configurações</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
