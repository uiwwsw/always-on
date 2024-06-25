import WithLayer from "./WithLayer";
import Spinner from "./Spinner";

function Loading() {
  return (
    <div className="flex items-center bg-white bg-opacity-60 h-full">
      <Spinner className="h-12" />
    </div>
  );
}
export default WithLayer(Loading);
