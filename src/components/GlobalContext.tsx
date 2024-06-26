import { createContext, useContext } from "react";
interface ContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
export const GlobalContext = createContext<ContextProps>({
  isLoading: false,
  setIsLoading: () => null,
});
const useGlobalContext = () => useContext(GlobalContext);
export default useGlobalContext;
