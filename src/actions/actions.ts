"use server";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// ----------- user actions -----------

export async function logIn(formhData: unknown) {
  if (!(formhData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  await signIn("credentials", formhData);

  revalidatePath("/app/dashboard");
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  // convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

// ----------- pet actions -----------
export async function addPet(pet: unknown) {
  const session = await checkAuth();

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
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  await getPetById(validatedPetId.data, session.user.id);

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
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  await getPetById(validatedPetId.data, session.user.id);

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

function checkFormDataType(formhData: unknown) {
  if (!(formhData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
}
