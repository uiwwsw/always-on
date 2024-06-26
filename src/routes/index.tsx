import { createFileRoute } from "@tanstack/react-router";
import Card from "components/Card";
import LoadingWithSmooth from "components/FloatLoading";
import useInfiniteScroll from "components/useInfiniteScroll";
import { useGetPlaces } from "libs/place/usecase/getPlaces";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPlaces();

  const items = useMemo(
    () => data?.pages.flatMap((x) => x.places),
    [data?.pages]
  );

  useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <h1 className="text-xl">영업중인 곳</h1>

      {items?.map((x) => <Card key={x.id} data={x} />)}
      <LoadingWithSmooth isOpen={isFetchingNextPage} />
    </div>
  );
}

export default Index;
