import { Pet } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type PetListProps = {
  pets: Pet[]
}

export default function PetList({pets}: PetListProps) {
  return (
    <ul className="border-light border-b bg-white">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
              {
                
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
