import React from "react";
import munchies from "../images/munchies.svg";

interface HeaderProps {
  src: string;
  alt: string;
  title: string;
  className: string;
}

function Header({ src, alt, title, className }: HeaderProps) {
  return (
    <header role="banner" aria-label="Munchies website header">
      <img
        src={munchies}
        alt="Munchies logo"
        title="Munchies - Treat Yourself"
        className="flex items-center justify-between mb-8"
      />
    </header>
  );
}

export default Header;
