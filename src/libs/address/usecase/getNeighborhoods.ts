import { useMutation } from "@tanstack/react-query";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";

export type NeighborhoodsInput = {
  cityId: string;
  districtId: string;
};

export const getNeighborhoods = async (
  cityId: string,
  districtId: string
): Promise<string[]> => {
  const neighborhoodsSnapshot = await getDocs(
    collection(
      doc(db, "cities", cityId, "districts", districtId),
      "neighborhoods"
    )
  );
  return neighborhoodsSnapshot.docs.map((doc) => doc.data().name);
};

export const useGetNeighborhoods = () => {
  return useMutation<string[], Error, NeighborhoodsInput>({
    mutationFn: async ({ cityId, districtId }: NeighborhoodsInput) => {
      if (!cityId || !districtId) return [];
      const neighborhoods = await getNeighborhoods(cityId, districtId);
      return neighborhoods;
    },
  });
};
