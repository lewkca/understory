/**
 * cn = "class names"
 *
 * Joins class names together and drops anything falsy, so you can write:
 *
 *     cn("px-4", isActive && "bg-accent", className)
 *
 * When `isActive` is false that middle value disappears instead of printing
 * the string "false" into your markup.
 *
 * The type annotations:
 *   ...classes      -> accepts any number of arguments
 *   ClassValue[]    -> each one may be a string, false, null, or undefined
 *   : string        -> the function always returns a string
 */
type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
