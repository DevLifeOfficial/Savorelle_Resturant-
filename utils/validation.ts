import { FieldConfig } from "@/config/loginFields"

export function validateField(
  field: FieldConfig,
  value: string,
  values: Record<string, string>
) {
  if (field.required && !value) {
    return `${field.label} is required`
  }

  if (field.minLength && value.length < field.minLength) {
    return `${field.label} must be at least ${field.minLength} characters`
  }

  if (field.maxLength && value.length > field.maxLength) {
    return `${field.label} must be less than ${field.maxLength} characters`
  }

  if (field.match && value !== values[field.match]) {
    return `${field.label} must match ${field.match}`
  }

  return ""
}