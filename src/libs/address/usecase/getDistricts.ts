import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
export const getDistricts = async (
  cityId: string
): Promise<{ id: string; name: string }[]> => {
  const districtsSnapshot = await getDocs(
    collection(doc(db, "cities", cityId), "districts")
  );
  return districtsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};
export const useGetDistricts = (cityId: string) => {
  return useQuery<{ id: string; name: string }[], Error>({
    queryKey: ["districts", cityId],
    queryFn: async () => {
      if (!cityId) return [];
      const districts = await getDistricts(cityId);
      return districts;
    },
    enabled: !!cityId, // cityId가 있을 때만 쿼리 실행
  });
};
