import { useState, useEffect } from "react" // Import useEffect
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"

interface NumberCounterProps {
  value?: number | null 
  onChange?: (value: number | null) => void 
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
  // Use a string for internal state to accommodate blank input
  const [internalInput, setInternalInput] = useState<string>(
    controlledValue !== undefined && controlledValue !== null
      ? String(controlledValue)
      : ""
  )

  // Effect to sync internalInput with controlledValue when it changes externally
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== null) {
      setInternalInput(String(controlledValue))
    } else {
      setInternalInput("")
    }
  }, [controlledValue])

  const parseAndClamp = (inputValue: string): number | null => {
    const parsedValue = parseInt(inputValue, 10)
    if (isNaN(parsedValue)) {
      return null
    }
    return Math.min(Math.max(parsedValue, min), max)
  }

  const emitChange = (newValue: number | null) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleIncrement = () => {
    const currentValue = parseAndClamp(internalInput) || 0 // Default to 0 if blank
    const newValue = Math.min(currentValue + step, max)
    setInternalInput(String(newValue))
    emitChange(newValue)
  }

  const handleDecrement = () => {
    const currentValue = parseAndClamp(internalInput) || 0 // Default to 0 if blank
    const newValue = Math.max(currentValue - step, min)
    setInternalInput(String(newValue))
    emitChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInternalInput(inputValue) // Always update internal input state
    
    // Only emit a number if it's a valid, parseable number
    const newValue = parseAndClamp(inputValue)
    emitChange(newValue)
  }

  const handleInputBlur = () => {
    const newValue = parseAndClamp(internalInput)
    if (newValue === null) {
      // If after blurring, the input is not a number, set it to blank
      // or to a default (e.g., min) if you prefer.
      // For now, we'll keep it blank if it's not a number.
      setInternalInput("") 
      emitChange(null)
    } else {
      // If it's a valid number, clamp it and update
      setInternalInput(String(newValue))
      emitChange(newValue)
    }
  }

  // Determine the displayed value for the input field
  const displayValue = internalInput

  // Determine the actual number value for increment/decrement logic and button disabling
  const numericValueForLogic = parseAndClamp(internalInput)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={disabled || (numericValueForLogic !== null && numericValueForLogic <= min)}
        aria-label="Decrease value"
        className="h-10 w-10 shrink-0 bg-white text-gray-900 hover:bg-gray-50"
      >
        <Minus className="h-4 w-4" />
      </Button>

      {/* Input for the value */}
      <Input
        type="text" 
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur} 
        disabled={disabled}
        className="h-10 w-20 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" // Tailwind for hiding default number input arrows
        aria-label="Number input"
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={disabled || (numericValueForLogic !== null && numericValueForLogic >= max)}
        aria-label="Increase value"
        className="h-10 w-10 shrink-0 bg-white text-gray-900 hover:bg-gray-50"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}