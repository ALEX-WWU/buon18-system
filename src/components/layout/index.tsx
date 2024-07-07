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

  return (
    <div className="fixed inset-0 grid grid-rows-[auto,1fr]">
      <div className="p-2">Logo</div>
      <div className="relative h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="absolute inset-0 rounded-lg border"
          onLayout={(sizes: number[]) => {
            document.cookie = `nav:layout=${JSON.stringify(sizes)}`;
          }}
        >
          <ResizablePanel
            defaultSize={defaultLayout[0] || 8}
            minSize={7}
            maxSize={10}
            className="min-w-12"
            collapsible
            collapsedSize={2}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = "nav:collapse=true";
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = "nav:collapse=false";
            }}
          >
            <Menu isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={defaultLayout[1] || 92}>
            <div className="flex h-full flex-col">
              <Breadcrumb />
              <div className="flex-1 p-2">{children}</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
