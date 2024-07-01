import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
export const getCities = async (): Promise<string[]> => {
  const citiesSnapshot = await getDocs(collection(db, "cities"));
  return citiesSnapshot.docs.map((doc) => doc.data().name);
};
export const useGetCities = () => {
  return useQuery<string[], Error>({
    queryKey: ["cities"],
    queryFn: async () => {
      const cities = await getCities();
      return cities;
    },
  });
};
