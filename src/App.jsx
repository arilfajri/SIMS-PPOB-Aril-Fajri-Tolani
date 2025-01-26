import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginView from "./view/LoginView";
import RegisterView from "./view/RegisterView";
import HomeView from "./view/HomeView";
import TopUpView from "./view/TopUpView";
import PaymentView from "./view/PaymentView";
import Transaction from "./view/TransactionView.jsx";
import ProfileView from "./view/ProfileView";
import { useTokenSelector } from "./config/redux/membership/membershipSelector.jsx";
import { useEffect } from "react";

function App() {
  const PrivateRouter = ({ children }) => {
    const token = useTokenSelector();
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token]);

    if (!token) {
      return null;
    }

    return children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route
          path="/home"
          element={
            <PrivateRouter>
              <HomeView />
            </PrivateRouter>
          }
        />
        <Route
          path="/topup"
          element={
            <PrivateRouter>
              <TopUpView />
            </PrivateRouter>
          }
        />
        <Route
          path="/home/payment"
          element={
            <PrivateRouter>
              <PaymentView />
            </PrivateRouter>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRouter>
              <Transaction />
            </PrivateRouter>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <ProfileView />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
