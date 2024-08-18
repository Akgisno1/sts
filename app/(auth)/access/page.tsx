import UserLoginForm from "@/components/forms/UserLoginForm";
import UserRegisterForm from "@/components/forms/UserRegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";

const page = () => {
  return (
    <div className="flex size-full flex-row items-center justify-center gap-4">
      <div className="flex h-[70%] w-[30%] flex-col">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <UserLoginForm />
          </TabsContent>
          <TabsContent value="register">
            <UserRegisterForm />
          </TabsContent>
        </Tabs>
        <Link
          className="relative z-10 w-full rounded-b-xl bg-[hsl(var(--primary))] p-2 font-oxo text-2xl text-[hsl(var(--primary-foreground))] max-sm:text-base"
          href="/access-ngo"
        >
          Login/Register as an NGO
        </Link>
      </div>

      <div className="relative flex h-[70%] w-[30%] flex-col justify-end">
        <img
          src="/logpage.jpg"
          alt="loginpageimage"
          className="absolute inset-0 size-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default page;
