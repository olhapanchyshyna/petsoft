import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import prisma from "@/lib/db";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await checkAuth();
  const pets = await getPetsByUserId(session.user.id);
  
  return (
    <>
      <BackgroundPattern />

      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />

        <PetContextProvider data={pets}>{children}</PetContextProvider>

        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
