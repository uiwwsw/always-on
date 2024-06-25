import source from "$/spinner.svg";

export default function Spinner({
  className = "size-5",
}: {
  className?: string;
}) {
  return (
    <img
      alt="로딩중"
      src={source}
      className={`block m-auto${className ? ` ${className}` : ""}`}
    />
  );
}
