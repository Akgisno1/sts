import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/actions/user.action";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handlelogout = async () => {
    try {
      await logoutUser();

      // Remove user info from local storage
      localStorage.removeItem("user");

      toast({
        title: "User Logged Out",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "LogOut failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handlelogout}
      className="group flex h-10 items-center gap-3 rounded-md p-4 font-oxo text-lg font-bold text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] "
    >
      <FaSignOutAlt className="text-2xl text-[hsl(var(--destructive))] group-hover:text-white md:text-center" />
      <span className="hidden group-hover:text-white md:inline">Logout</span>
    </Button>
  );
};

export default Logout;
