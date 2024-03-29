"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssential } from "@/lib/types";
import { Pet } from "@prisma/client";

import { ReactNode, createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (formData: PetEssential) => Promise<void>;
  handleEditPet: (petData: PetEssential, petId: Pet["id"]) => Promise<void>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, data }) => {
      switch (action) {
        case "add":
          return [...state, { ...data, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === data.id) {
              return { ...pet, ...data.petData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== data);
        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // devider state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions

  const handleAddPet = async (petData: PetEssential) => {
    setOptimisticPets({ action: "add", data: petData });
    const error = await addPet(petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petData: PetEssential, petId: Pet["id"]) => {
    setOptimisticPets({ action: "edit", data: { id: petId, petData } });
    const error = await editPet(petData, petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: Pet["id"]) => {
    setOptimisticPets({ action: "delete", data: id });
    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
