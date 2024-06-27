import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
export const getCities = async (): Promise<{ id: string; name: string }[]> => {
  const citiesSnapshot = await getDocs(collection(db, "cities"));
  return citiesSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};
export const useGetCities = () => {
  return useQuery<{ id: string; name: string }[], Error>({
    queryKey: ["cities"],
    queryFn: async () => {
      const cities = await getCities();
      return cities;
    },
  });
};
