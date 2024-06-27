import Spinner from "./Spinner";
import WithBounce from "./WithBounce";
import WithLayer from "./WithLayer";
import WithSmooth from "./WithSmooth";

export function Loading() {
  return (
    <div className="flex items-center bg-white bg-opacity-20 h-full">
      <Spinner className="h-12" />
    </div>
  );
}
const LoadingWithLayer = WithSmooth(WithLayer(Loading));
export const LoadingWithBounce = WithSmooth(WithBounce(Loading));
export default LoadingWithLayer;
