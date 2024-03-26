import { PlusIcon } from "lucide-react";
import { ReactNode } from "react";
import PetForm from "./pet-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  onClick,
  children,
}: PetButtonProps) {
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          buttonText={actionType === "add" ? "Add pet" : "Save changes"}
        />
      </DialogContent>
    </Dialog>
  );
}
