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

const PAGE_SIZE = 10; // 한 페이지에 가져올 데이터 수

export const getPlaces = async (
  pageParam?: QueryDocumentSnapshot<DocumentData>
): Promise<PlaceWithId[]> => {
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

    return places;
  } catch (e) {
    throw new Error("Error getting documents: " + e);
  }
};

export const useGetPlaces = () => {
  return useInfiniteQuery<PlaceWithId[]>({
    queryKey: ["places"],
    queryFn: ({ pageParam }) =>
      getPlaces(pageParam as QueryDocumentSnapshot<DocumentData>),
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE
        ? lastPage[lastPage.length - 1]
        : null;
    },
    initialPageParam: null,
  });
};
