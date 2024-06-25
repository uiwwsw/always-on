import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "utils/firebase";

const fetchFirestoreData = () => {
  return new Promise((resolve, reject) => {
    console.log("12312j3kl12j3d");
    const unsubscribe = onSnapshot(
      collection(db, "test"),
      (snapshot) => {
        console.log(snapshot, "djawkl;djawdawd");
        const data = snapshot.docs.map((doc) => {
          console.log(doc.id, "djawkl;djawdawd");
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

export const useFirestoreData = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "test"), (snapshot) => {
      queryClient.setQueryData(
        ["firestoreData"],
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [queryClient]);

  return useQuery({
    queryKey: ["firestoreData"],
    queryFn: fetchFirestoreData,
    staleTime: Infinity,
  });
};
