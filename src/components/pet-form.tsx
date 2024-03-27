"use client";

import { addPet, editPet } from "@/actions/actions";
import { usePetContext } from "@/lib/hooks";
import { toast } from "sonner";
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
  const { selectedPet } = usePetContext();

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const pet = {
  //     name: formData.get("name") as string,
  //     ownerName: formData.get("ownerName") as string,
  //     imageUrl:
  //       (formData.get("imageUrl") as string) ||
  //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //     age: +(formData.get("age") as string),
  //     notes: formData.get("notes") as string,
  //   };

  // 	if(actionType === "edit"){
  // 		handleEditPet(selectedPet?.id as string, pet)
  // 	}else if(actionType === "add"){
  // 		handleAddPet(pet);
  // 	}

  //   onFormSubmission();
  // };

  return (
    <form
      action={async (formData) => {
        if (actionType === "add") {
          const error = await addPet(formData);
          if (error) {
            toast.warning(error.message);
            return;
          }
        } else if (actionType === "edit") {
          const error = await editPet(selectedPet?.id as string,formData);
          if (error) {
            toast.warning(error.message);
            return;
          }
        }

        onFormSubmission();
      }}
      className="flex flex-col space-y-3"
    >
      <div className="space-y-3">
        <div className="items-center space-y-1">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="ownerName" className="text-right">
            Owner Name
          </Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="imageUrl" className="text-right">
            Image Url
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="age" className="text-right">
            Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
