"use client";

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export function Slider({ value, min, max, step = 1, onChange }: SliderProps) {
  return (
    <input
      className="w-full accent-blue-600"
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
