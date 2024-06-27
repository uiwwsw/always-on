import { useEffect } from "react";

const useInfiniteScroll = (callback: () => void, margin: number = 0) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop - margin >=
        document.documentElement.offsetHeight
      )
        return;
      callback();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, margin]);
};

export default useInfiniteScroll;
