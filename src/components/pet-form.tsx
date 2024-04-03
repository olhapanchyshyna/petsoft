"use client";

import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { usePetContext } from "@/lib/hooks";
import { TPetForm, petFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: string;
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

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
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="ownerName" className="text-right">
            Owner Name
          </Label>
          <Input {...register("ownerName")} id="ownerName" />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="imageUrl" className="text-right">
            Image Url
          </Label>
          <Input {...register("imageUrl")} id="imageUrl" />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="age" className="text-right">
            Age
          </Label>
          <Input {...register("age")} id="age" />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea {...register("notes")} id="notes" rows={3} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
