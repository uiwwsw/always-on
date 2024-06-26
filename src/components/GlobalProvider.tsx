import { ReactNode, createContext, useState } from "react";
import LoadingWithLayer from "./Loading";

export interface ContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
export const GlobalContext = createContext<ContextProps>({
  isLoading: false,
  setIsLoading: () => null,
});
const GlobalProvider = ({ children }: { children?: ReactNode }) => {
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
