import { ReactNode } from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex max-h-screen min-h-screen min-w-full flex-col bg-background">
      <nav className="flex h-[60px] items-center justify-between border-b border-border px-4 py-2">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex h-full w-full flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
