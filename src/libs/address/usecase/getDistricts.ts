import { useMutation } from "@tanstack/react-query";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
export const getDistricts = async (cityId: string): Promise<string[]> => {
  const districtsSnapshot = await getDocs(
    collection(doc(db, "cities", cityId), "districts")
  );
  return districtsSnapshot.docs.map((doc) => doc.data().name);
};
export const useGetDistricts = () => {
  return useMutation<string[], Error, string>({
    mutationFn: getDistricts,
  });
};
