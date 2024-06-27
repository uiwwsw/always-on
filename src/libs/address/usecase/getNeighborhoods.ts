import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
export const getNeighborhoods = async (
  cityId: string,
  districtId: string
): Promise<{ id: string; name: string }[]> => {
  const neighborhoodsSnapshot = await getDocs(
    collection(
      doc(db, "cities", cityId, "districts", districtId),
      "neighborhoods"
    )
  );
  return neighborhoodsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};
export const useGetNeighborhoods = (cityId: string, districtId: string) => {
  return useQuery<{ id: string; name: string }[], Error>({
    queryKey: ["neighborhoods", cityId, districtId],
    queryFn: async () => {
      if (!cityId || !districtId) return [];
      const neighborhoods = await getNeighborhoods(cityId, districtId);
      return neighborhoods;
    },
    enabled: !!cityId && !!districtId, // cityId와 districtId가 있을 때만 쿼리 실행
  });
};
