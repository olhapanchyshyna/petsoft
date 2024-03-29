import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: string;
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-6 self-end">
      {actionType === "add" ? "Add pet" : "Save changes"}
    </Button>
  );
}
