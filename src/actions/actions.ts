"use server";
import prisma from "@/lib/db";
import { PetEssential } from '@/lib/types'
import { petFormSchema } from '@/lib/validations'
import { Pet } from '@prisma/client'
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {

  const validatedPet = petFormSchema.safeParse(pet)
  if(!validatedPet.success){
    return{
      message: "Invalid pet data"
    }
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data
    }); 
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(newPetData: unknown, petId: unknown, ) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData
    });
  } catch (error) {
    return {
      message: "Could not edit pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown,) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      }
    });
  } catch (error) {
    return {
      message: "Could not delete pet",
    };
  }

  revalidatePath("/app", "layout");
}