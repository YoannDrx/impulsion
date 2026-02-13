import { Header } from "@/features/layout/header";
import type { ReactNode } from "react";

export default function OrgsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}
