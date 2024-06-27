import { Address as DaumAddress } from "react-daum-postcode";
export type Address = DaumAddress;
export function getFullAddress(data?: Address) {
  if (!data) return "";
  let fullAddress = data.address;
  let extraAddress = "";
  if (data.addressType === "R") {
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      extraAddress +=
        extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }
  return fullAddress;
}
