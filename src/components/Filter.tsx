import { useGetCities } from "libs/address/usecase/getCities";
import WithOver, { WithOverProps } from "./WithOver";
import ButtonWithTheme from "./Button";
import { useGetDistricts } from "libs/address/usecase/getDistricts";
import { useGetNeighborhoods } from "libs/address/usecase/getNeighborhoods";
import { useCallback, useState } from "react";
export function Filter({
  onClose,
  onSubmit,
}: WithOverProps<{
  city?: string;
  district?: string;
  neighborhood: string[];
}>) {
  const [city, setCity] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [neighborhood, setNeighborhood] = useState<string[]>([]);
  const { data: cities } = useGetCities();
  const { data: districts, mutateAsync: getDistricts } = useGetDistricts();
  const { data: neighborhoods, mutateAsync: getNeighborhoods } =
    useGetNeighborhoods();
  const handleCityClick = useCallback(
    (cityName: string) => {
      setCity(cityName);
      setDistrict("");
      setNeighborhood([]);
      getDistricts(cityName);
    },
    [getDistricts]
  );
  const handleDistrictClick = useCallback(
    (district: string) => {
      if (!city || !district) return;
      setDistrict(district);
      setNeighborhood([]);
      getNeighborhoods({ cityId: city, districtId: district });
    },
    [city, getNeighborhoods]
  );
  const handleSubmit = useCallback(
    (neighborhood: string) =>
      setNeighborhood((prev) => {
        if (prev.includes(neighborhood))
          return [...prev.filter((x) => x !== neighborhood)];
        return [...prev, neighborhood];
      }),
    []
  );
  return (
    <div className="bg-white rounded-md">
      <div className="flex gap-1 w-72">
        {city && (
          <ButtonWithTheme
            className="flex-1"
            onClick={() => {
              setCity(undefined);
              setDistrict(undefined);
              setNeighborhood([]);
            }}
            theme="secondary"
          >
            <div className="flex m-auto w-fit">{city}</div>
          </ButtonWithTheme>
        )}
        {district && (
          <ButtonWithTheme
            className="flex-1"
            onClick={() => {
              setDistrict(undefined);
              setNeighborhood([]);
            }}
            theme="secondary"
          >
            <div className="flex m-auto w-fit">{district}</div>
          </ButtonWithTheme>
        )}
      </div>
      <div className="overflow-hidden">
        {neighborhood?.map((x) => (
          <ButtonWithTheme
            className="float-left"
            key={x}
            theme="secondary"
            onClick={() =>
              setNeighborhood((prev) => [...prev.filter((y) => y !== x)])
            }
          >
            <div className="flex m-auto w-fit">{x}</div>
          </ButtonWithTheme>
        ))}
      </div>
      <div className="[&>*]:w-full">
        {!city &&
          cities?.map((x) => (
            <ButtonWithTheme
              theme={x === city ? "secondary" : "primary"}
              key={x}
              onClick={() => handleCityClick(x)}
            >
              {x}
            </ButtonWithTheme>
          ))}
        {city &&
          !district &&
          districts?.map((x) => (
            <ButtonWithTheme
              theme={x === district ? "secondary" : "primary"}
              key={x}
              onClick={() => handleDistrictClick(x)}
            >
              {x}
            </ButtonWithTheme>
          ))}
        {district &&
          neighborhoods
            ?.filter((x) => !neighborhood?.includes(x))
            .map((x) => (
              <ButtonWithTheme
                theme={neighborhood?.includes(x) ? "secondary" : "primary"}
                key={x}
                onClick={() => handleSubmit(x)}
              >
                {x}
              </ButtonWithTheme>
            ))}
      </div>
      <ButtonWithTheme
        onClick={() => {
          onSubmit?.({ city, district, neighborhood });
          onClose?.();
        }}
        className="mt-2 w-full"
      >
        적용
      </ButtonWithTheme>
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
