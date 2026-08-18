import { useCallback, type ChangeEvent, type ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { formatPhoneMask } from '@/lib/phone'
import { cn } from '@/lib/utils'

type PhoneInputProps = Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange'> & {
  value: string
  onValueChange: (value: string) => void
}

export function PhoneInput({
  value,
  onValueChange,
  className,
  onBlur,
  ...props
}: PhoneInputProps) {
  const applyMask = useCallback(
    (raw: string) => {
      onValueChange(formatPhoneMask(raw))
    },
    [onValueChange],
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    applyMask(e.target.value)
  }

  return (
    <Input
      {...props}
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      maxLength={15}
      value={value}
      onChange={handleChange}
      onInput={(e) => applyMask((e.target as HTMLInputElement).value)}
      onBlur={(e) => {
        applyMask(e.target.value)
        onBlur?.(e)
      }}
      className={cn(className)}
    />
  )
}
