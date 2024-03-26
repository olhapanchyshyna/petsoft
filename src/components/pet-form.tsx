"use client"

import { FormEvent } from 'react'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from '@/lib/hooks'

type PetFormProps = {
	buttonText: string,
	onFormSubmission: () => void
}

export default function PetForm({ buttonText, onFormSubmission }: PetFormProps) {

	const {handleAddPet} = usePetContext()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const newPet = {
			name: formData.get("name") as string,
			ownerName: formData.get("ownerName") as string,
			imageUrl: formData.get("imageUrl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
			age: +(formData.get("age") as string),
			notes: formData.get("notes") as string
		}

		handleAddPet(newPet)
		onFormSubmission()
	}

  return (
    <form onSubmit={handleSubmit}  className="flex flex-col space-y-3">
      <div className="space-y-3">
        <div className="items-center space-y-1">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" type="text" required/>
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="ownerName" className="text-right">
            Owner Name
          </Label>
          <Input id="ownerName" name="ownerName" type="text" required/>
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="imageUrl" className="text-right">
            Image Url
          </Label>
          <Input id="imageUrl" name="imageUrl" type="text" />
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="age" className="text-right">
            Age
          </Label>
          <Input id="age" name="age" type="number" required/>
        </div>

        <div className="items-center space-y-1">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea id="notes" name="notes" rows={3} required/>
        </div>
      </div>

      <Button type="submit" className="mt-6 self-end">
        {buttonText}
      </Button>
    </form>
  );
}
