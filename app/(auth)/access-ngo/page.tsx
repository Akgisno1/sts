import NgoLoginForm from "@/components/forms/NgoLoginForm";
import NgoRegisterForm from "@/components/forms/NgoRegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="flex size-full flex-row items-center justify-center gap-4">
      <div className="flex h-[70%] w-[30%] items-center justify-center">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <NgoLoginForm />
          </TabsContent>
          <TabsContent value="register">
            <NgoRegisterForm />
          </TabsContent>
        </Tabs>
      </div>

      <div className="relative flex h-[70%] w-[30%] flex-col justify-end">
        <img
          src="/ngologpage.jpg"
          alt="loginpageimage"
          className="absolute inset-0 size-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default page;
