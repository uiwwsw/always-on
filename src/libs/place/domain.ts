export type PlaceType = "카페" | "식당";
export interface Place {
  name: string;
  address: string;
  kakaoUrl: string;
  type: PlaceType;
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
