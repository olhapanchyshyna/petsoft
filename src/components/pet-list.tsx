import Image from 'next/image'

export default function PetList() {
  return (
    <ul className="border-light border-b bg-white">
      <li>
        <button className='flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition'>
          <Image
            src='https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png'
            alt="Pet image"
            width={45}
            height={45}
            className="h-[45px] w-[45px] rounded-full object-cover"
          />
          <p className="font-semibold">name</p>
        </button>
      </li>
    </ul>
  );
}
