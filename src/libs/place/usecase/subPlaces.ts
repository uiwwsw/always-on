import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  collection,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  FirestoreDataConverter,
} from "firebase/firestore";
import { db } from "utils/firebase";
import { Place } from "../domain";

// Place 타입에 id 필드를 추가한 타입 정의
interface PlaceWithId extends Place {
  id: string;
}

// Firestore 데이터 변환기
const placeConverter: FirestoreDataConverter<Place> = {
  toFirestore(place: Place): DocumentData {
    return { ...place };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Place {
    const data = snapshot.data();
    return {
      name: data.name,
      address: data.address,
      type: data.type,
      description: data.description,
      url: data.url,
    } as Place;
  },
};

const fetchPlaces = (): Promise<PlaceWithId[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      collection(db, "place").withConverter(placeConverter),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PlaceWithId[];
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );

    return () => unsubscribe();
  });
};

export const useGetPlaces = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "place").withConverter(placeConverter),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        queryClient.setQueryData<PlaceWithId[]>(["place"], data);
      }
    );

    return () => unsubscribe();
  }, [queryClient]);

  return useQuery<PlaceWithId[]>({
    queryKey: ["place"],
    queryFn: fetchPlaces,
  });
};
