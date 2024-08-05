"use client";

import type { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@components/ui/resizable";
import React from "react";
import { Button } from "@components/ui/button";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addMonths, format } from "date-fns";

interface LayoutProps extends PropsWithChildren {
  defaultCollapse?: boolean;
  defaultLayout?: number[];
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  defaultCollapse = false,
  defaultLayout = [8, 92],
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapse);
  const router = useRouter();

  return (
    <div className="fixed inset-0 grid grid-rows-[auto,1fr]">
      <div className="flex items-center justify-between p-2 px-5">
        <div className="h-10">
          <Image
            src="/assets/Logo_Icon-01.png"
            alt="418 logo"
            width={64}
            height={64}
            className="h-full w-full"
          />
        </div>
        <Button
          onClick={() => {
            router.push("/profile");
          }}
        >
          <UserCircle />
        </Button>
      </div>
      <div className="relative h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="absolute inset-0 rounded-lg border"
          onLayout={(sizes: number[]) => {
            const futureDate = addMonths(new Date(), 1);
            document.cookie = `nav:layout=${JSON.stringify(sizes)}; expires=${format(futureDate, "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}; SameSite=None; Secure`;
          }}
        >
          <ResizablePanel
            defaultSize={defaultLayout[0] || 8}
            minSize={8}
            maxSize={10}
            className="min-w-12"
            collapsible
            collapsedSize={2}
            onCollapse={() => {
              setIsCollapsed(true);
              const futureDate = addMonths(new Date(), 1);
              document.cookie = `nav:collapse=true; expires=${format(futureDate, "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}; SameSite=None; Secure`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              const futureDate = addMonths(new Date(), 1);
              document.cookie = `nav:collapse=false; expires=${format(futureDate, "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}; SameSite=None; Secure`;
            }}
          >
            <Menu isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={defaultLayout[1] || 92}>
            <div className="flex h-full flex-col">
              <Breadcrumb />
              <div className="flex-1 px-2">{children}</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
