import { LabelHTMLAttributes, ReactElement } from "react";
import clsx from "clsx";
import WithTheme, { WithThemeProps } from "./WithTheme";
export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  WithThemeProps & {
    children?: string;
    container?: ReactElement;
  };
export function Label({ children, size, container, ...props }: LabelProps) {
  return (
    <label {...props} className="inline-flex flex-col gap-1">
      <span
        className={clsx("!pb-0 font-bold", {
          "px-3 p-2 text-sm": size === "sm",
          "px-3.5 p-2.5 text-base": size === "md",
          "px-4 p-3 text-xl": size === "xl",
        })}
      >
        {children}
      </span>
      {container}
    </label>
  );
}
const LabelWithTheme = WithTheme(Label);
export default LabelWithTheme;
