"use client";

import { Pet } from "@/lib/types";
import { ReactNode, createContext, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
	selectedPet: Pet | undefined;
  handleChangeSelectedPetId: (id: string) => void
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
	// state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

	// devider state
	const selectedPet = pets.find((pet) => pet.id === selectedPetId)

	// event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
		setSelectedPetId(id)
	};

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
				selectedPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
