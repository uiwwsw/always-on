import { Address } from "libs/address/domain";

export const PLACETYPES = ["카페", "음식점", "숙박", "편의점", "기타"] as const;
export type PlaceType = (typeof PLACETYPES)[number];
export interface Place {
  name: string;
  address: Address;
  type: PlaceType;
  description?: string;
  url?: string;
  on: boolean;
}
export interface PlaceWithId extends Place {
  id: string;
}
