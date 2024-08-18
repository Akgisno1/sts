"use client";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlobalSearch from "./shared/GlobalSearch";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-[9vh] w-screen flex-row items-center justify-between bg-[hsl(var(--primary))] p-4">
      <div className="flex  flex-row items-center gap-4  ">
        <Image src={"/straytostay.png"} alt="logo" width={36} height={36} />
        <h2 className=" font-oxo text-4xl font-bold text-white max-md:text-3xl max-sm:hidden">
          StraytoStay
        </h2>
      </div>
      {!(pathname === "/access" || pathname === "/access-ngo") && (
        <div className="flex flex-row items-center justify-center rounded-xl  bg-transparent max-md:hidden">
          <GlobalSearch />
        </div>
      )}
      <div className="flex  flex-row items-center justify-end gap-4  ">
        {pathname === "/access" || pathname === "/access-ngo" ? (
          <Link
            href="/"
            className="rounded-lg bg-[hsl(var(--primary-foreground))] p-2 font-oxo text-2xl text-[hsl(var(--primary))] max-md:text-base"
          >
            Back to Home
          </Link>
        ) : (
          <Link
            href="/access"
            className="rounded-lg bg-[hsl(var(--primary-foreground))] p-2 font-oxo text-2xl text-[hsl(var(--primary))] max-md:text-base"
          >
            Login/Register
          </Link>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopBar;
