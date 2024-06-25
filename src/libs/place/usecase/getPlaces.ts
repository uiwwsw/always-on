import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "utils/firebase";

const fetch = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      collection(db, "place"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
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
    const unsubscribe = onSnapshot(collection(db, "place"), (snapshot) => {
      queryClient.setQueryData(
        ["place"],
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [queryClient]);

  return useQuery({
    queryKey: ["place"],
    queryFn: fetch,
  });
};
