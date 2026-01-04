const assetUrls = import.meta.glob('../assets/**/*', {
  eager: true,
  as: 'url',
});

export function resolveAsset(input) {
  if (!input) return input;

  if (
    input.startsWith('http://') ||
    input.startsWith('https://') ||
    input.startsWith('data:') ||
    input.startsWith('blob:')
  ) {
    return input;
  }

  if (input.startsWith('/')) return input;

  const normalized = input.startsWith('assets/') ? `../${input}` : input;

  return assetUrls[normalized] ?? input;
}
