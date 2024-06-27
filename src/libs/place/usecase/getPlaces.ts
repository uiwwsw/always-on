import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "utils/firebase";
import { Place, PlaceWithId } from "../domain";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 30; // 한 페이지에 가져올 데이터 수
export const getPlaces = async (
  pageParam: QueryDocumentSnapshot<DocumentData> | null
): Promise<{
  places: PlaceWithId[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const colRef = collection(db, "place");
    const q = pageParam
      ? query(colRef, orderBy("name"), startAfter(pageParam), limit(PAGE_SIZE))
      : query(colRef, orderBy("name"), limit(PAGE_SIZE));

    const querySnapshot = await getDocs(q);
    const places = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Place),
    }));

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { places, lastVisible };
  } catch (e) {
    throw new Error("Error getting documents: " + e);
  }
};

export const useGetPlaces = () => {
  return useInfiniteQuery<
    {
      places: PlaceWithId[];
      lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    },
    Error
  >({
    queryKey: ["places"],
    queryFn: async ({ pageParam = null }) => {
      const { places, lastVisible } = await getPlaces(
        pageParam as QueryDocumentSnapshot<DocumentData>
      );
      return { places, lastVisible };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.lastVisible;
    },
    initialPageParam: null,
  });
};
