"use client";

import { usePetContext } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { zodResolver } from '@hookform/resolvers/zod'

type PetFormProps = {
  actionType: string;
  onFormSubmission: () => void;
};
type TPetForm = z.infer<typeof petFormShema>


const petFormShema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(100),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image url must be a valid url" }),
  ]),
  age: z.coerce.number().int().positive().max(99999),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormShema)
  });

  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: Number(formData.get("age") as string),
          notes: formData.get("notes") as string,
        };

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(petData, selectedPet!.id);
        }
      }}
      className="flex flex-col space-y-3"
    >
      <div className="space-y-3">
        <div className="items-center space-y-1">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            id="name"
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="ownerName" className="text-right">
            Owner Name
          </Label>
          <Input
            {...register("ownerName")}
            id="ownerName"
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="imageUrl" className="text-right">
            Image Url
          </Label>
          <Input
            {...register("imageUrl")}
            id="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="age" className="text-right">
            Age
          </Label>
          <Input
            {...register("age")}
            id="age"
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea
            {...register("notes")}
            id="notes"
            rows={3}
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
