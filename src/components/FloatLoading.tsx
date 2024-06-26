import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import WithBounce from "./WithBounce";
import WithSmooth, { WithSmoothProps } from "./WithSmooth";

export function FloatLoading({ isOpen }: WithSmoothProps) {
  const [top, setTop] = useState<number>();
  useEffect(() => {
    if (isOpen) {
      setTop(window.scrollY + window.innerHeight - 100);
    }
  }, [isOpen]);
  return (
    <div
      style={{ top: top }}
      className="right-0 left-0 absolute flex items-center [&>*]:!bg-transparent [&>*]:m-auto w-full h-11"
    >
      <Loading />
    </div>
  );
}
const LoadingWithSmooth = WithSmooth(WithBounce(FloatLoading), 500);
export default LoadingWithSmooth;
