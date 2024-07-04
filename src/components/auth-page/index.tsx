"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@refinedev/core";
import { LoginForm, LoginFormSchema } from "@models/auth";
import { LucideLockKeyhole, LucideMail } from "lucide-react";

export function AuthPage() {
  const { mutate: login } = useLogin<LoginForm>();

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  function onSubmit(data: LoginForm) {
    login(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-[24rem] flex-col gap-4 rounded p-10 shadow"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <LucideMail /> Email
              </FormLabel>
              <FormControl>
                <Input placeholder="example@buon18.com" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <LucideLockKeyhole />
                Password
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-3 flex">
          <Button type="submit" className="flex-1">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
