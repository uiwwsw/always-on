import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import WithLayer from "./WithLayer";

function Postcode() {
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

    console.log(fullAddress);
  };

  return (
    <DaumPostcodeEmbed onComplete={handleComplete} style={{ height: "100%" }} />
  );
}
export default WithLayer(Postcode);
