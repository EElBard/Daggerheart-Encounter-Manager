import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

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

      <div className="flex h-10 w-20 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium tabular-nums">
        {value}
      </div>

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
