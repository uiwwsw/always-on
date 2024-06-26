import { forwardRef } from "react";
import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import WithTheme, { WithThemeProps } from "./WithTheme";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  WithThemeProps & {
    onClear?: () => void;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ theme, size, onClear, className, ...props }, ref) => {
    return (
      <span
        className={clsx(
          "relative flex rounded-md items-center gap-1 min-w-64",
          {
            "px-3 p-2 text-sm": size === "sm",
            "px-3.5 p-2.5 text-base": size === "md",
            "px-4 p-3 text-xl": size === "xl",
            "focus-within:ring": theme === "primary",
          },
          className
        )}
      >
        <textarea
          ref={ref}
          {...props}
          className={clsx(
            "text-ellipsis w-full rounded-md border-none outline-none"
          )}
        />
        {onClear && props.value && (
          <button onClick={onClear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className={clsx("size-6", {
                "stroke-teal-600": theme === "primary",
              })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
        <i className="absolute inset-0 border border-teal-600 rounded-md pointer-events-none" />
      </span>
    );
  }
);

const TextareaWithTheme = WithTheme(Textarea);
export default TextareaWithTheme;
