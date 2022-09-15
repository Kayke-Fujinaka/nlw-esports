import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProps) {
  return <label {...props} className="font-semibold" />;
}
