import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout() {
  const NavLinks = [
    {
      id: 1,
      title: 'Login',
      href: '/auth',
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
