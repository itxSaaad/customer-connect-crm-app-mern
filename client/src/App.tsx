import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';

import MainLayout from './components/layout/MainLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';
import AuthScreen from './pages/AuthScreen';
import HomeScreen from './pages/HomeScreen';
import NotFoundScreen from './pages/NotFoundScreen.tsx';
import PrivateHomeScreen from './pages/private/PrivateHomeScreen.tsx';
import UserMGMTScreen from './pages/private/admin/UserMGMTScreen';
import AdminDashScreen from './pages/private/dashboards/AdminDashScreen';
import ManagerDashScreen from './pages/private/dashboards/ManagerDashScreen';
import SalesDashScreen from './pages/private/dashboards/SalesDashScreen';
import CustomerMGMTScreen from './pages/private/shared/CustomerMGMTScreen';
import InteractionMGMTScreen from './pages/private/shared/InteractionMGMTScreen';
import LeadMGMTScreen from './pages/private/shared/LeadMGMTScreen';
import OpportunityMGMTScreen from './pages/private/shared/OpportunityMGMTScreen';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
        </Route>

        {/* Private Routes */}
        <Route path="/private" element={<ProtectedLayout />}>
          <Route index element={<PrivateHomeScreen />} />
          {/* Admin Routes */}
          <Route path="/private/admin" element={<AdminDashScreen />} />
          <Route path="/private/admin/users" element={<UserMGMTScreen />} />
          <Route path="/private/admin/leads" element={<LeadMGMTScreen />} />
          <Route
            path="/private/admin/customers"
            element={<CustomerMGMTScreen />}
          />
          <Route
            path="/private/admin/interactions"
            element={<InteractionMGMTScreen />}
          />
          <Route
            path="/private/admin/opportunities"
            element={<OpportunityMGMTScreen />}
          />

          {/* Manager Routes */}
          <Route path="/private/manager" element={<ManagerDashScreen />} />
          <Route path="/private/manager/leads" element={<LeadMGMTScreen />} />
          <Route
            path="/private/manager/customers"
            element={<CustomerMGMTScreen />}
          />
          <Route
            path="/private/manager/interactions"
            element={<InteractionMGMTScreen />}
          />
          <Route
            path="/private/manager/opportunities"
            element={<OpportunityMGMTScreen />}
          />

          {/* Sales Routes */}
          <Route path="/private/sales" element={<SalesDashScreen />} />
          <Route path="/private/sales/leads" element={<LeadMGMTScreen />} />
          <Route
            path="/private/sales/customers"
            element={<CustomerMGMTScreen />}
          />
          <Route
            path="/private/sales/interactions"
            element={<InteractionMGMTScreen />}
          />
          <Route
            path="/private/sales/opportunities"
            element={<OpportunityMGMTScreen />}
          />
        </Route>

        <Route path="*" element={<NotFoundScreen />} />
      </>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
