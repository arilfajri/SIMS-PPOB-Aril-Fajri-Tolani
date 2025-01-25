import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "./view/LoginView";
import RegisterView from "./view/RegisterView";
import HomeView from "./view/HomeView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/home" element={<HomeView />} />
      </Routes>
    </Router>
  );
}

export default App;
