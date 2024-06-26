import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import WithTheme, { WithThemeProps } from "./WithTheme";
export function Button({
  theme,
  size,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & WithThemeProps) {
  return (
    <span className="flex min-w-64">
      <button
        {...props}
        className={clsx(
          "transition rounded-md flex-1",
          {
            "px-3 p-2 text-sm": size === "sm",
            "px-3.5 p-2.5 text-base": size === "md",
            "px-4 p-3 text-xl": size === "sm",
            "bg-teal-600 hover:bg-teal-500 text-white active:bg-teal-700":
              theme === "primary",
          },
          className
        )}
      />
    </span>
  );
}
const ButtonWithTheme = WithTheme(Button);
export default ButtonWithTheme;
