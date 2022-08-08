const PRICE_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export function formatPrice(num: number) {
  return PRICE_FORMATTER.format(num);
}
