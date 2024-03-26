import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import prisma from "@/lib/db";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const pets = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />

      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />

        <PetContextProvider data={pets}>{children}</PetContextProvider>

        <AppFooter />
      </div>
    </>
  );
}
