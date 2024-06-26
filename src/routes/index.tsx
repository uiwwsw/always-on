import { createFileRoute } from "@tanstack/react-router";
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
      <h3>Welcome Home!</h3>
      {data?.map((x) => <div>{x.name}</div>)}
    </div>
  );
}
