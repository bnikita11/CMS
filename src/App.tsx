import { Provider } from 'react-redux';
import { store } from './redux/slices/store';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import MainLayout from './components/ui/MainLayout'; // Corrected path

// Public Pages
import LoginPage from './pages/login/LoginPage';
import RegisterCompletePage from './pages/register/CompleteRegister';
import RegisterPage from './pages/register/FirstPage';
import RegisterPage2 from './pages/register/SecondPage';
import RegisterPage3 from './pages/register/ThirdPage';
import DashboardPage from './pages/dashboard/Dashboard';
import UserManagementPage from './pages/usermanagement/UserManagement';
import ClientManagementPage from './pages/clientmanagement/ClientManagement';
import { Calendar } from './components/ui/calendar';
import ClientDetailPage from './pages/clientmanagement/ClientDetails';

// Authenticated Pages
// import DashboardPage from ".pages/dashboard/Dashboard";
// import ClientManagementPage from './pages/clientmanagement/ClientManagement';
// import UserManagementPage from './pages/usermanagement/UserManagement';


function App() {
    const { isLoggedIn } = useAuth();
    

    return (
        <Provider store={store}>
            <Routes>
                {/* Public Routes (No Layout) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/get-started" element={<RegisterPage />} />
                <Route path="/sign-up" element={<RegisterPage2 />} />
                <Route path="/contact-info" element={<RegisterPage3 />} />
                <Route path="/account-activated" element={<RegisterCompletePage />} />

                {/* Protected Routes (MainLayout) */}
                <Route
                    path="/"
                    element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" replace />}
                >
                    <Route index element={<DashboardPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="user-management" element={<UserManagementPage/>} />
                    <Route path="client-management" element={<ClientManagementPage />} />
                    <Route path="client-management/client-detail/:clientId" element={<ClientDetailPage/>} />                    <Route path="calendar" element={<Calendar />} />

                    {/* Add other protected routes here */}
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
            </Routes>
        </Provider>
    );
}

export default App;
