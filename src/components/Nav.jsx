import { useState } from "react";

export default function Nav() {
  const [active, setActive] = useState("Inicio");



  return (
    <nav className="flex gap-4 ml-auto">
      {links.map((link) => (
        <a
          key={link.name}
          href="#"
          onClick={() => setActive(link.name)}
          className={`flex items-center gap-1 px-3 py-1 rounded transition ${
            active === link.name ? "bg-pink-500 text-white" : "bg-pink-300 text-white hover:bg-pink-400"
          }`}
        >
          {link.icon} {link.name}
        </a>
      ))}
    </nav>
  );
}


