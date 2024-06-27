import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import WithTheme, { WithThemeProps } from "./WithTheme";
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & WithThemeProps
>(({ theme, size, className, ...props }, ref) => {
  return (
    <span className="flex min-w-64">
      <button
        ref={ref}
        {...props}
        className={clsx(
          "transition rounded-md flex-1",
          {
            "px-3 p-2 text-sm": size === "sm",
            "px-3.5 p-2.5 text-base": size === "md",
            "px-4 p-3 text-lg": size === "lg",
            "bg-teal-600 hover:bg-teal-500 text-white active:bg-teal-700":
              theme === "primary",
          },
          className
        )}
      />
    </span>
  );
});
const ButtonWithTheme = WithTheme(Button);
export default ButtonWithTheme;
