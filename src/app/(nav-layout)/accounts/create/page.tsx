"use client";

import { Button } from "@components/ui/button";
import { Form, FormField } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Sheet, SheetTrigger } from "@components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, AccountCreateSchema } from "@models/account";
import { useCreate, useNavigation } from "@refinedev/core";
import { Check, List, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SocialMedia as SheetSocialMedia } from "@/components/sheet/SocialMedia";
import { InputFormField, SelectFormField } from "@components/form";

export default function AccountCreate() {
  const form = useForm<Account>({
    resolver: zodResolver(AccountCreateSchema),
  });
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "social_medias",
    keyName: "uuid",
  });
  const { list } = useNavigation();
  const { mutate } = useCreate();

  function onSubmit(data: Account) {
    mutate(
      {
        resource: "accounts",
        values: data,
      },
      {
        onSuccess: () => {
          list("accounts");
        },
      },
    );
  }

  return (
    <Sheet>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err);
          })}
          className="relative flex h-full flex-col overflow-hidden rounded-lg px-1 pb-2"
        >
          <div className="flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => list("accounts")}
            >
              <List />
            </Button>
            <Button
              type="submit"
              size="icon"
              variant="outline"
              className="ml-auto hover:bg-green-500 hover:text-secondary"
            >
              <Check />
            </Button>
          </div>

          <div className="grid flex-1 grid-cols-[1fr,1fr] gap-5 pt-2">
            <div className="h-full overflow-hidden rounded-2xl outline outline-[2px] outline-muted">
              <div className="flex justify-between bg-primary p-4 text-2xl font-bold text-secondary">
                <p>Account</p>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <InputFormField
                      field={field}
                      errorField={form.formState.errors.code}
                      placeholder="Account Code"
                    />
                  )}
                />
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 items-center border-b-2 pb-2">
                  <h2 className="scroll-m-20 px-2 font-bold tracking-tight lg:text-xl">
                    Name:
                  </h2>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <InputFormField
                        field={field}
                        errorField={form.formState.errors.name}
                        placeholder="Account Name"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 items-center border-b-2 pb-2">
                  <h2 className="scroll-m-20 px-2 font-bold tracking-tight lg:text-xl">
                    Gender:
                  </h2>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <SelectFormField
                        field={field}
                        placeholderSelect="Pick your gender"
                        groupLabel="Gender"
                        defaultSelectedValue="U"
                        options={[
                          { label: "Male", value: "M" },
                          { label: "Female", value: "F" },
                          { label: "Unknown", value: "U" },
                        ]}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 items-center border-b-2 pb-2">
                  <h2 className="scroll-m-20 px-2 font-bold tracking-tight lg:text-xl">
                    Email:
                  </h2>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <InputFormField
                        field={field}
                        errorField={form.formState.errors.email}
                        placeholder="No Email"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 items-center border-b-2 pb-2">
                  <h2 className="scroll-m-20 px-2 font-bold tracking-tight lg:text-xl">
                    Address:
                  </h2>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <InputFormField
                        field={field}
                        errorField={form.formState.errors.address}
                        placeholder="No Address"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 items-center border-b-2 pb-2">
                  <h2 className="scroll-m-20 px-2 font-bold tracking-tight lg:text-xl">
                    Phone:
                  </h2>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <InputFormField
                        field={field}
                        errorField={form.formState.errors.phone}
                        placeholder="Account Phone"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 items-center border-b-2 pb-2">
                  <h2 className="scroll-m-20 px-2 font-bold tracking-tight lg:text-xl">
                    Secondary Phone:
                  </h2>
                  <FormField
                    control={form.control}
                    name="secondary_phone"
                    render={({ field }) => (
                      <InputFormField
                        field={field}
                        errorField={form.formState.errors.secondary_phone}
                        placeholder="No Secondary Phone"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="scroll-m-20 font-extrabold tracking-tight lg:text-xl">
                  Social Media
                </h2>
                <SheetTrigger asChild>
                  <Button className="flex items-center gap-2" type="button">
                    <Plus />
                    <span>Add Social Media</span>
                  </Button>
                </SheetTrigger>
              </div>
              <div className="flex flex-col gap-3">
                {fields.map((socialMedia, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      onChange={(e) => {
                        update(index, {
                          ...socialMedia,
                          platform: e.target.value,
                        });
                      }}
                      className="text-primary"
                      defaultValue={socialMedia.platform}
                    />
                    <Input
                      onChange={(e) => {
                        update(index, {
                          ...socialMedia,
                          url: e.target.value,
                        });
                      }}
                      className="text-primary"
                      defaultValue={socialMedia.url}
                    />
                    <Button
                      type="button"
                      size="icon"
                      className="aspect-square"
                      variant="destructive"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Form>
      <SheetSocialMedia
        onSubmit={(data) => {
          append(data);
        }}
      />
    </Sheet>
  );
}
