"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaHeart,
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaBookmark,
} from "react-icons/fa";
import Logout from "./shared/Logout";
import { useAuth } from "@/context/AuthContext";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { currentUser } = useAuth(); // Use the custom hook here
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures client-side rendering is complete
  }, []);

  const linkClasses = (href: string) =>
    `flex h-10 items-center py-4 md:pl-4 gap-3 font-oxo text-lg font-bold rounded-md max-md:justify-center ${
      pathname === href
        ? "bg-[hsl(var(--primary))] text-white"
        : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--card))]"
    }`;

  const iconClasses = (href: string) =>
    `${pathname === href ? "text-white" : "text-[hsl(var(--primary))]"}`;

  return (
    <div className="flex h-full w-[300px] flex-col justify-between bg-[hsl(var(--primary-foreground))] p-4 max-md:w-[80px] max-sm:hidden">
      <div className="flex h-full flex-col gap-6">
        <Link href="/" className={linkClasses("/")}>
          <FaHome className={`text-2xl ${iconClasses("/")}`} />
          <span className="max-md:hidden">Home</span>
        </Link>
        <Link href="/adopt" className={linkClasses("/adopt")}>
          <FaHeart className={`text-2xl ${iconClasses("/adopt")}`} />
          <span className="max-md:hidden">Adoption</span>
        </Link>
        <Link href="/community" className={linkClasses("/community")}>
          <FaUsers className={`text-2xl ${iconClasses("/community")}`} />
          <span className="max-md:hidden">Community</span>
        </Link>
        <Link href="/ngo" className={linkClasses("/ngo")}>
          <FaBuilding className={`text-2xl ${iconClasses("/ngo")}`} />
          <span className="max-md:hidden">NGO Activity</span>
        </Link>
        <Link href="/post" className={linkClasses("/post")}>
          <FaFileAlt className={`text-2xl ${iconClasses("/post")}`} />
          <span className="max-md:hidden">Create Post</span>
        </Link>
        <Link href="/saved" className={linkClasses("/saved")}>
          <FaBookmark className={`text-2xl ${iconClasses("/saved")}`} />
          <span className="max-md:hidden">Saved Posts</span>
        </Link>
      </div>
      {isMounted && currentUser && <Logout />}{" "}
      {/* Conditionally render after mounting */}
    </div>
  );
};

export default LeftSidebar;
