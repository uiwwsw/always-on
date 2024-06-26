import { createFileRoute } from "@tanstack/react-router";
import Card from "components/Card";
import LoadingWithLayer from "components/Loading";
import { useGetPlaces } from "libs/place/usecase/getPlaces";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, error, isLoading } = useGetPlaces();

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="p-2">
      <LoadingWithLayer isOpen={isLoading} />
      <h1 className="text-xl">영업중인 곳</h1>

      {data?.map((x) => <Card key={x.id} data={x} />)}
    </div>
  );
}
