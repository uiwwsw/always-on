import WithOver, { WithOverProps } from "./WithOver";
export function Filter({ onClose }: WithOverProps) {
  return (
    <div className="bg-white rounded-md">
      <h3>필터</h3>
      <div role="button">블라블라</div>
      <input type="text" />
      <button onClick={onClose}>ㅇㅁㅇㅁㅈ</button>
    </div>
  );
}

const FilterWithOver = WithOver(
  Filter,
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
);
export default FilterWithOver;
