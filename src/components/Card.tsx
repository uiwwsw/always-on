import { Place } from "libs/place/domain";
export default function Card({ data }: { data: Place }) {
  return (
    <div className="bg-blue-100 my-1 p-2 rounded-md">
      <p className="text-lg">{data.name}</p>
      <div className="flex gap-1">
        <span>{data.type}</span>
        <span>{data.address}</span>
      </div>
    </div>
  );
}
