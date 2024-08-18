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
import { userValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";

import { createUser } from "@/lib/actions/user.action";

type UserRegisterValues = z.infer<typeof userValidationSchema>;

const UserRegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<UserRegisterValues>({
    resolver: zodResolver(userValidationSchema),
  });

  const onSubmit: SubmitHandler<UserRegisterValues> = async (values) => {
    try {
      await createUser({
        name: values.name,
        username: values.username,
        password: values.password,
      });
      toast({
        title: "Registered user",
      });
      router.push("/useronboarding");
    } catch (error) {
      toast({
        title: "User Registration Failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex size-full  items-center rounded-t-xl bg-[hsl(var(--secondary))]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full p-4 text-white"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-[hsl(var(--foreground))]">
                  Name
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
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserRegisterForm;
