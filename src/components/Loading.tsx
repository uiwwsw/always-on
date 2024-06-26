import Spinner from "./Spinner";
import WithBlocking from "./WithBlocking";

export function Loading() {
  return (
    <div className="flex items-center bg-white bg-opacity-60 h-full">
      <Spinner className="h-12" />
    </div>
  );
}
const LoadingWithLayer = WithBlocking(Loading);
export default LoadingWithLayer;
