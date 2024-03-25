"use client";

import { ReactNode, createContext, useState } from "react";

type SearchContextProviderProps = {
  children: ReactNode;
};

type TSearchContext = {
	serchQuery: string
  handleChangeSerchQuery: (name: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  // state
  const [serchQuery, setSerchQuery] = useState('');

  // devider state

  // event handlers / actions
  const handleChangeSerchQuery = (name: string) => {
    setSerchQuery(name);
    console.log(serchQuery);
  };

  return (
    <SearchContext.Provider
      value={{
				serchQuery,
        handleChangeSerchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
