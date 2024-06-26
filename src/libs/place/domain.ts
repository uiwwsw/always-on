export const PLACETYPES = ["카페", "음식점", "숙박", "편의점", "기타"] as const;
export type PlaceType = (typeof PLACETYPES)[number];
export interface Place {
  name: string;
  address: string;
  type: PlaceType;
  description?: string;
  url?: string;
}
// export class KakaoPlace implements Place {
//   name: string;
//   address: string;
//   kakaoUrl: string;
//   type: PlaceType;
//   constructor({}: {}) {
//     this.name = " string";
//     this.address = " string";
//     this.kakaoUrl = " string";
//     this.type = " PlaceType";
//   }
// }
