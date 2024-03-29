"use server";

import prisma from "@/lib/db";
import { PetEssential } from '@/lib/types'
import { Pet } from '@prisma/client'
import { revalidatePath } from "next/cache";

export async function addPet(pet: PetEssential) {
  try {
    await prisma.pet.create({
      data: pet
    }); 
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(newPetData: PetEssential, petId: Pet["id"], ) {
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

export async function deletePet(petId: string,) {
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