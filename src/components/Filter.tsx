import { useGetCities } from "libs/address/usecase/getCities";
import WithSheet, { WithSheetProps } from "./WithSheet";
import ButtonWithTheme from "./Button";
import { useGetDistricts } from "libs/address/usecase/getDistricts";
import { useGetNeighborhoods } from "libs/address/usecase/getNeighborhoods";
import { useCallback, useState } from "react";
export function Filter({
  onClose,
}: WithSheetProps<{
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
        onClick={() => onClose?.({ city, district, neighborhood })}
        className="mt-2 w-full"
      >
        적용
      </ButtonWithTheme>
    </div>
  );
}

const FilterWithSheet = WithSheet(Filter);
export default FilterWithSheet;
