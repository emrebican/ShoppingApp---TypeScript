export function formatContent(content: string) {
  return content.split(" ").slice(0, 10).join(" ") + " . . .";
}
