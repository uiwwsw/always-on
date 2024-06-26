import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import WithTheme, { WithThemeProps } from "./WithTheme";
export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & WithThemeProps
>(({ theme, size, className, ...props }, ref) => {
  return (
    <span className={clsx("relative flex items-center min-w-64", className)}>
      <select
        ref={ref}
        {...props}
        className={clsx(
          "peer transition rounded-md appearance-none outline-none w-full",
          {
            "px-3 p-2 pr-5 text-sm": size === "sm",
            "px-3.5 p-2.5 pr-6 text-base": size === "md",
            "px-4 p-3 pr-7 text-xl": size === "xl",
            "focus:ring bg-teal-600 text-white": theme === "primary",
          }
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={clsx(
          "absolute size-4 peer-focus:rotate-180 transition-transform",
          {
            "right-0.5": size === "sm",
            "right-1": size === "md",
            "right-1.5": size === "xl",
            "stroke-white": theme === "primary",
          }
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </span>
  );
});
const SelectWithTheme = WithTheme(Select);
export default SelectWithTheme;
