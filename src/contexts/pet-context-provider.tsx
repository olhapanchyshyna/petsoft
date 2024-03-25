"use client";

import { Pet } from '@/lib/types'
import { ReactNode, createContext, useState } from "react";

type PetContextProviderProps = {
	data: Pet[]
	children: ReactNode
}

type TPetContext = {
	pets:Pet[]
	selectedPetId: string | null
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({data, children }: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
