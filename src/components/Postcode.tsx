import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import WithSheet, { WithSheetProps } from "./WithSheet";

export function Postcode({ onClose }: WithSheetProps) {
  const handleComplete = (data: Address) => {
    onClose?.(data);
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
const PostcodeWithSheet = WithSheet(Postcode, "주소검색창");
export default PostcodeWithSheet;
