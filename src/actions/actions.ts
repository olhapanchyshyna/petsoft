"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addPet(formData: any) {
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: +formData.get("age"),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
		return{
			message: "Could not add pet"
		}
	}

  revalidatePath("/app", "layout");
}
