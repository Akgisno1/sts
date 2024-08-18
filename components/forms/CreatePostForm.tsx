"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "../ui/input";
import { Form, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormControl,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { adoptionFormSchema } from "@/lib/validation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

// State and city data
const stateCityMap = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  // Add more states and their major cities here
};

const CreatePostForm = () => {
  const { currentUser } = useAuth();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  const form = useForm<z.infer<typeof adoptionFormSchema>>({
    resolver: zodResolver(adoptionFormSchema),
  });

  // Handle state change
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setCities(stateCityMap[state] || []);
  };

  // Submit handler
  function onSubmit(values: z.infer<typeof adoptionFormSchema>) {
    console.log(values);
  }

  return (
    <>
      <button onClick={() => console.log(currentUser)}>click</button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Urgency field */}
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="no">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State field */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleStateChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(stateCityMap).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  disabled={!selectedState}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default CreatePostForm;
