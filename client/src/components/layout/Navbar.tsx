interface NavLink {
  id: number;
  title: string;
  href: string;
}

interface NavLinkProps {
  NavLinks: NavLink[];
}

import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Navbar({ NavLinks }: NavLinkProps) {
  return (
    <header className="flex h-16 items-center justify-center border-b border-slate-200 px-4 dark:border-slate-700">
      <nav className="flex items-center justify-between w-full">
        <NavLink to="/" className="text-2xl font-bold">
          Customer Connect
        </NavLink>

        <ul className="flex items-center justify-center gap-4">
          {NavLinks.map((link) => (
            <li key={link.id}>
              <NavLink to={link.href}>
                <Button variant="ghost">{link.title}</Button>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
