"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema definition using Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CreatePodcast = () => {
  // Initialize useForm with schema and resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: { username: string }) => {
    console.log("Form Data:", data);
    // Add your logic for creating a podcast
  };

  return (
    <section className="flex flex-col mt-9">
      <Form {...form}>
        <h1 className="text-lg font-bold text-white">
          Create Podcast
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 border-b border-black-2 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
