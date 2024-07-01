import { forwardRef } from "react";
import { ComponentType } from "react";

export interface WithThemeProps {
  size?: "sm" | "md" | "lg";
  theme?: "primary" | "secondary";
}

export default function WithTheme<P>(
  WrappedComponent: ComponentType<WithThemeProps & P>
) {
  const WrappedComponentRef = forwardRef((props: WithThemeProps & P, ref) => {
    const size = props.size ?? "md";
    const theme = props.theme ?? "primary";
    return <WrappedComponent {...props} ref={ref} theme={theme} size={size} />;
  });

  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WrappedComponentRef.displayName = `WithTheme(${componentName})`;

  return WrappedComponentRef;
}
