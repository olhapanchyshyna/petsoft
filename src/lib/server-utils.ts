import { Pet, User } from "@prisma/client";
import { redirect } from "next/navigation";
import "server-only";
import { auth } from "./auth-no-edge";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function getPetById(petId: Pet["id"], session: string) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session) {
    return {
      message: "Not authorized",
    };
  }

  return pet;
}

export async function getPetsByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
