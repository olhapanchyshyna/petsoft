import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: ReactNode;
};

export default function PetButton({ actionType, children }: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit" || actionType === "checkout") {
    return <Button variant="secondary">{children}</Button>;
  }
}
