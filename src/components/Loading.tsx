import Spinner from "./Spinner";
import WithLayer from "./WithLayer";
import WithSmooth from "./WithSmooth";

export function Loading() {
  return (
    <div className="flex items-center bg-white bg-opacity-60 h-full">
      <Spinner className="h-12" />
    </div>
  );
}
const LoadingWithLayer = WithSmooth(WithLayer(Loading));
export default LoadingWithLayer;
