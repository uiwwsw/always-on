import { createFileRoute } from "@tanstack/react-router";
import Card from "components/Card";
import FilterWithOver from "components/Filter";
import { LoadingWithBounce } from "components/Loading";
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
  }, 300);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-xl">영업중인 곳</h1>
        <FilterWithOver />
      </div>

      {items?.map((x) => <Card key={x.id} data={x} />)}
      <div className="right-0 bottom-20 left-0 fixed [&>*>*]:!bg-transparent">
        <LoadingWithBounce isOpen={isFetchingNextPage} />
      </div>
    </div>
  );
}

export default Index;
