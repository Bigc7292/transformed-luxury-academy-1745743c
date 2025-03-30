import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface InputOTPProps {
  className?: string;
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  render: (props: { slots: ReactNode[] }) => ReactNode;
}

export const InputOTP: React.FC<InputOTPProps> = ({
  className,
  maxLength,
  value = "",
  onChange,
  inputProps,
  render
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  const slots = Array.from({ length: maxLength }, (_, i) => (
    <div key={i}>{value[i] || ""}</div>
  ));

  return (
    <div className={className}>
      <input
        {...inputProps}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        className={cn("hidden", inputProps?.className)}
      />
      {render({ slots })}
    </div>
  );
};

export default InputOTP;
