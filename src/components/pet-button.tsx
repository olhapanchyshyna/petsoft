import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: ReactNode;
  onClick?: () => void
};

export default function PetButton({ actionType, onClick, children }: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return <Button variant="secondary" onClick={onClick}>{children}</Button>;
  }
}
