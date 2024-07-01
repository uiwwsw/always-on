import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import WithTheme, { WithThemeProps } from "./WithTheme";
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & WithThemeProps
>(({ theme, size, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "transition rounded-md",
        {
          "px-3 p-2 text-sm": size === "sm",
          "px-3.5 p-2.5 text-base": size === "md",
          "px-4 p-3 text-lg": size === "lg",
          "bg-teal-600 hover:bg-teal-500 text-white active:bg-teal-700":
            theme === "primary",
          "bg-amber-600 hover:bg-amber-500 text-white active:bg-amber-700":
            theme === "secondary",
        },
        className
      )}
    />
  );
});
const ButtonWithTheme = WithTheme(Button);
export default ButtonWithTheme;
