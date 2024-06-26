import { collection, addDoc } from "firebase/firestore";
import { db } from "utils/firebase";
import { Place, PlaceWithId } from "../domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createPlace = async (place: Place) => {
  try {
    const docRef = await addDoc(collection(db, "place"), place);
    return { id: docRef.id, ...place };
  } catch (e) {
    throw new Error("Error adding document: " + e);
  }
};
export const useCreatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation<PlaceWithId, Error, Place>({
    mutationFn: createPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["place"],
      });
    },
  });
};
