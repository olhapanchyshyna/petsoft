import { useFormStatus } from 'react-dom'
import { Button } from "./ui/button";

type PetFormBtnProps ={
	actionType: string
}

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
	const {pending} = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-6 self-end">
      {actionType === "add" ? "Add pet" : "Save changes"}
    </Button>
  );
}
