import { NavLink } from "react-router-dom";
import { Heart } from 'react-feather';

const navigation = [
  { name: "Agenda", href: "/", current: true },
  { name: "Random Quote", href: "/random-quote", current: false }
];

const NavBar = () => {
  return (
    <nav className="fixed z-10 top-0 left-0 flex items-center text-[1rem] w-full px-4 py-4 bg-white text-mainColor font-mono border-b border-mainColor/10">
      <h1><Heart color="#9d164d" fill="#9d164d" size={48} className="mr-10" /></h1>
      <div className="flex gap-x-10">
      {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={(item:any) => (item.isActive ? 'underline' : '')}
          >
            {item.name}
          </NavLink>
      ))}
      </div>
    </nav>
  )
}

export default NavBar
