export function useSliderIndexStore(sliderId = 'all') {
  const key = `next-slider-index-storage-[${sliderId}]`

  return {
    getIndex: (fallback: string | number) =>
      parseInt(`${localStorage.getItem(key)}` || '0', 10) || fallback,
    setIndex: (value: number) => localStorage.setItem(key, `${value}`),
  }
}
