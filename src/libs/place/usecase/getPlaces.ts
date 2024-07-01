import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  QueryOrderByConstraint,
  QueryLimitConstraint,
  QueryFieldFilterConstraint,
  QueryStartAtConstraint,
} from "firebase/firestore";
import { db } from "utils/firebase";
import { Place, PlaceWithId } from "../domain";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 30; // 한 페이지에 가져올 데이터 수

export const getPlaces = async (
  pageParam: QueryDocumentSnapshot<DocumentData> | null,
  filter: { city?: string; district?: string; neighborhood: string[] }
): Promise<{
  places: PlaceWithId[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const colRef = collection(db, "place");
    const conditions: (
      | QueryOrderByConstraint
      | QueryLimitConstraint
      | QueryFieldFilterConstraint
      | QueryStartAtConstraint
    )[] = [orderBy("name"), limit(PAGE_SIZE)];

    // 필터를 조건에 추가
    if (filter.city) {
      conditions.push(where("address.sido", "==", filter.city));
    }
    if (filter.district) {
      conditions.push(where("address.sigungu", "==", filter.district));
    }
    if (filter.neighborhood.length > 0) {
      conditions.push(where("address.bname", "in", filter.neighborhood));
    }

    if (pageParam) {
      conditions.push(startAfter(pageParam));
    }

    const q = query(colRef, ...conditions);

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

export const useGetPlaces = (filter: {
  city?: string;
  district?: string;
  neighborhood: string[];
}) => {
  return useInfiniteQuery<
    {
      places: PlaceWithId[];
      lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    },
    Error
  >({
    queryKey: ["places", filter],
    queryFn: async ({ pageParam = null }) => {
      const { places, lastVisible } = await getPlaces(
        pageParam as QueryDocumentSnapshot<DocumentData>,
        filter
      );
      return { places, lastVisible };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.lastVisible;
    },
    initialPageParam: null,
  });
};
