import { ReactNode, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import LoadingWithLayer from "./Loading";

interface GlobalProviderProps {
  children?: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
      <LoadingWithLayer isOpen={isLoading} />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
