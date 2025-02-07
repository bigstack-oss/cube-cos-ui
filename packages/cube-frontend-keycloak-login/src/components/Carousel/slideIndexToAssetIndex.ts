// The infinite carousel works by adding "buffer slides" to the start (showing
// the last asset) and end (showing the first asset) when there's more than 1
// asset.
// This means the slide index is not always equal to the asset index.
export const slideIndexToAssetIndex = (
  slideIndex: number,
  assetsLength: number,
): number => {
  const remaining = slideIndex % assetsLength
  if (remaining < 0) {
    return remaining + assetsLength
  }
  return remaining
}
