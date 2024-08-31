import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PrivateHomeScreen = () => {
  // Access the current user’s role from Redux store
  const userRole = 'admin';

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">
          Welcome Back {userRole === 'admin' ? ' Admin' : ''}!
        </h1>
        <p className="text-lg mt-2">Here's what's new and important for you.</p>
      </header>
      <div className="flex items-center gap-4">
        {/* Conditional links based on user role */}
        {userRole === 'admin' && (
          <>
            <Link to="/private/admin/users">
              <Button>Manage Users</Button>
            </Link>
            <Link to="/private/admin/leads">
              <Button variant="secondary">View Leads</Button>
            </Link>
          </>
        )}
        {/* {userRole === 'manager' && (
          <>
            <Link to="/private/manager/customers">
              <Button>View Customers</Button>
            </Link>
            <Link to="/private/manager/opportunities">
              <Button variant="secondary">View Opportunities</Button>
            </Link>
          </>
        )}
        {userRole === 'sales-rep' && (
          <>
            <Link to="/private/sales/interactions">
              <Button>Manage Interactions</Button>
            </Link>
            <Link to="/private/sales/customers">
              <Button variant="secondary">View Customers</Button>
            </Link>
          </>
        )} */}
      </div>
    </div>
  );
};

export default PrivateHomeScreen;
