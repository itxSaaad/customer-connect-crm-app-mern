import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

export default function ProtectedLayout() {
  const NavLinks = [
    {
      id: 1,
      title: 'Home',
      href: '/',
    },
    {
      id: 2,
      title: 'Dashboard',
      href: '/private',
    },
  ];
  return (
    <>
      <Navbar NavLinks={NavLinks} />
      <Outlet />
      <Footer />
    </>
  );
}
