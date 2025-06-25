import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"

interface NumberCounterProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
}

export default function NumberCounter({
  value: controlledValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = "",
}: NumberCounterProps) {
  const [internalValue, setInternalValue] = useState(0)

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const updateValue = (newValue: number) => {
    // Ensure the new value stays within min/max bounds
    const clampedValue = Math.min(Math.max(newValue, min), max);
    if (onChange) {
      onChange(clampedValue)
    } else {
      setInternalValue(clampedValue)
    }
  }

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max)
    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min)
    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    // Only update if it's a valid number, otherwise keep the old value or handle error
    if (!isNaN(newValue)) {
      updateValue(newValue);
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
        // If the input is not a number, revert to the last valid value
        updateValue(value);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease value"
        className="h-10 w-10 shrink-0 bg-white text-gray-900 hover:bg-gray-50"
      >
        <Minus className="h-4 w-4" />
      </Button>

      {/* Input for the value */}
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur} // Optional: handle blur for validation/reformatting
        min={min} // Set min attribute for native input validation
        max={max} // Set max attribute for native input validation
        step={step} // Set step attribute
        disabled={disabled}
        className="h-10 w-20 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" // Tailwind for hiding default number input arrows
        aria-label="Number input"
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase value"
        className="h-10 w-10 shrink-0 bg-white text-gray-900 hover:bg-gray-50"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
