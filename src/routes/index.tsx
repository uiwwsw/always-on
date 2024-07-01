import { createFileRoute } from "@tanstack/react-router";
import ButtonWithTheme from "components/Button";
import Card from "components/Card";
import FilterWithSheet from "components/Filter";
import { LoadingWithBounce } from "components/Loading";
import useInfiniteScroll from "components/useInfiniteScroll";
import { useGetPlaces } from "libs/place/usecase/getPlaces";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<{
    city?: string;
    district?: string;
    neighborhood: string[];
  }>({ neighborhood: [] });
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPlaces(filter);

  const items = useMemo(
    () => data?.pages.flatMap((x) => x.places),
    [data?.pages]
  );

  useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, 300);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-xl">영업중인 곳</h1>
        <ButtonWithTheme onClick={() => setOpenFilter(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </ButtonWithTheme>
        <FilterWithSheet
          isOpen={openFilter}
          onClose={(values) => {
            values &&
              setFilter({
                city: values.city,
                district: values.district,
                neighborhood: values.neighborhood,
              });
            setOpenFilter(false);
          }}
        />
      </div>
      {items?.map((x) => <Card key={x.id} data={x} />)}
      <div className="right-0 bottom-20 left-0 fixed [&>*>*]:!bg-transparent">
        <LoadingWithBounce isOpen={isFetchingNextPage} />
      </div>
    </div>
  );
}

export default Index;
