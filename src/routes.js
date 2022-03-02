import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Clients from './pages/Clients';
import Folders from './pages/Folders';
import AccountActivities from './pages/AccountActivities';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import CaseStatus from './pages/CaseStatus';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import Licences from './pages/Licences';
import ApproveUser from './pages/ApproveUser';
import LicencesList from './pages/LicencesList';
import ChangePassword from './pages/ChangePassword';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'clients', element: <Clients /> },
        { path: 'folders', element: <Folders /> },
        { path: 'accountActivities', element: <AccountActivities /> },
        { path: 'tasks', element: <Tasks /> },
        { path: 'documents', element: <Documents /> },
        { path: 'caseStatus', element: <CaseStatus /> },
        { path: 'licences', element: <Licences /> },
        { path: 'licencesList', element: <LicencesList /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'approveUser', element: <ApproveUser /> },
        { path: 'changePassword', element: <ChangePassword /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'profile', element: <Profile /> },
        { path: 'forgotPassword', element: <ForgetPassword /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
