import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import WithLayer, { WithLayerProps } from "./WithLayer";

export function Postcode({ onClose }: WithLayerProps) {
  const handleComplete = (data: Address) => {
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

    onClose?.(fullAddress);
  };

  return (
    <DaumPostcodeEmbed
      onComplete={handleComplete}
      focusInput
      animation
      autoClose={false}
      style={{ height: "100%" }}
    />
  );
}
const PostcodeWithLayer = WithLayer(Postcode, "주소검색창");
export default PostcodeWithLayer;
