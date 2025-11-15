"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import LogoutButton from "./LogOutButton";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen?: boolean;
}

export default function AdminNavbar({
  toggleSidebar,
  sidebarOpen = false,
}: NavbarProps) {
  return (
    <nav className="bg-white text-black h-20 flex items-center justify-between px-4 shadow-md z-10">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 focus:outline-none cursor-pointer transition-colors hover:text-[#e08a42]"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="flex py-4 items-center">
          <div className="flex items-center gap-5">
            <Link href={"/"} className="flex items-center gap-2">
              <img src="/black-logo.png" className="w-20" alt="Logo" />
            </Link>
            <Link href={"/"}>
              <img
                className="w-30"
                src="/innoverse-logo.webp"
                alt="Innoverse"
              />
            </Link>
          </div>
        </Link>
      </div>
      <LogoutButton />
    </nav>
  );
}
