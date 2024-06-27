import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address } from "../domain";
export const createAddress = async (address: Address) => {
  const { sido, sigungu, bname } = address;

  try {
    // 시(city) 컬렉션 참조
    const cityRef = doc(collection(db, "cities"), sido);
    const cityDoc = await getDoc(cityRef);

    // 구(district) 서브컬렉션 참조
    const districtRef = doc(collection(cityRef, "districts"), sigungu);
    const districtDoc = await getDoc(districtRef);

    // 동(neighborhood) 서브컬렉션 참조
    const neighborhoodRef = doc(
      collection(districtRef, "neighborhoods"),
      bname
    );

    if (!cityDoc.exists()) {
      await setDoc(cityRef, { name: sido });
    }

    if (!districtDoc.exists()) {
      await setDoc(districtRef, { name: sigungu });
    }

    await setDoc(neighborhoodRef, { name: bname }, { merge: true });
  } catch (e) {
    throw new Error("Error adding document: " + e);
  }
};
export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Address>({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cities", "districts", "neighborhoods"],
      });
    },
  });
};
