import { useContext } from "react";
import { GlobalContext, ContextProps } from "./GlobalProvider";

const useGlobalContext = (): ContextProps => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default useGlobalContext;
