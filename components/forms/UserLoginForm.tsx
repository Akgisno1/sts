"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { userLoginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

import { loginUser } from "@/lib/actions/user.action";

type UserLoginValues = z.infer<typeof userLoginSchema>;

const UserLoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { updateUser } = useAuth(); // Correctly use the useAuth hook

  const form = useForm<UserLoginValues>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<UserLoginValues> = async (values) => {
    try {
      const userInfo = await loginUser({
        username: values.username,
        password: values.password,
      });

      if (userInfo) {
        localStorage.setItem("user", userInfo);
        updateUser(JSON.parse(userInfo)); // Correctly update the user information in context
        toast({
          title: "User Logged In",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center rounded-t-xl bg-[hsl(var(--secondary))]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-4 text-white"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-[hsl(var(--foreground))]">
                  Username
                </FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-[hsl(var(--card))]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-[hsl(var(--foreground))]">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="h-12 bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-8 font-mont text-xl font-bold">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserLoginForm;
