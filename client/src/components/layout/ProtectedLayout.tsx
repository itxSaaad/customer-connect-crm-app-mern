import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

export default function ProtectedLayout() {
  const userRole = 'admin';

  const commonNavLinks = [
    { id: 1, title: 'Home', href: '/private' },
    { id: 2, title: 'Profile', href: '/private/profile' },
  ];

  const roleBasedNavLinks = (() => {
    switch (userRole) {
      case 'admin':
        return [
          {
            id: 3,
            title: 'Dashboard',
            href: '/private/admin',
          },
          {
            id: 4,
            title: 'Manage Users',
            href: '/private/admin/users',
          },
          {
            id: 5,
            title: 'View Leads',
            href: '/private/admin/leads',
          },
          {
            id: 6,
            title: 'View Customers',
            href: '/private/admin/customers',
          },
          {
            id: 7,
            title: 'View Interactions',
            href: '/private/admin/interactions',
          },
          {
            id: 8,
            title: 'View Opportunities',
            href: '/private/admin/opportunities',
          },
        ];
      // case 'manager':
      //   return [
      //     {
      //       id: 3,
      //       title: 'Dashboard',
      //       href: '/private/manager',
      //     },
      //     {
      //       id: 4,
      //       title: 'View Leads',
      //       href: '/private/manager/leads',
      //     },
      //     {
      //       id: 5,
      //       title: 'View Customers',
      //       href: '/private/manager/customers',
      //     },
      //     {
      //       id: 6,
      //       title: 'View Interactions',
      //       href: '/private/manager/interactions',
      //     },
      //     {
      //       id: 7,
      //       title: 'View Opportunities',
      //       href: '/private/manager/opportunities',
      //     },
      //   ];
      // case 'sales-rep':
      //   return [
      //     {
      //       id: 3,
      //       title: 'Dashboard',
      //       href: '/private/sales',
      //     },
      //     {
      //       id: 4,
      //       title: 'Manage Interactions',
      //       href: '/private/sales/interactions',
      //     },
      //     {
      //       id: 5,
      //       title: 'View Customers',
      //       href: '/private/sales/customers',
      //     },
      //     {
      //       id: 6,
      //       title: 'View Opportunities',
      //       href: '/private/sales/opportunities',
      //     },
      //   ];
      default:
        return [];
    }
  })();
  return (
    <>
      <Navbar NavLinks={[...commonNavLinks, ...roleBasedNavLinks]} />
      <Outlet />
      <Footer />
    </>
  );
}
