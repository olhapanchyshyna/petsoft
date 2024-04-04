"use server";
import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ----------- user actions -----------

export async function logIn(formhData: FormData) {
  await signIn("credentials", formhData);

  revalidatePath("/app/dashboard");
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formhData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formhData.get("password") as string,
    10,
  );

  await prisma.user.create({
    data: {
      email: formhData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formhData);
}

// ----------- pet actions -----------
export async function addPet(pet: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(newPetData: unknown, petId: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete pet",
    };
  }

  revalidatePath("/app", "layout");
}
