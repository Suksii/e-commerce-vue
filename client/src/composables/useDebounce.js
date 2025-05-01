import { onBeforeUnmount, ref, watch } from 'vue'

export const useDebounce = (value, delay) => {
  const debounced = ref(value.value)
  let timeout

  const clear = () => {
    if (timeout) clearTimeout(timeout)
  }

  watch(value, (newValue) => {
    clear()
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  onBeforeUnmount(() => {
    clear()
  })

  return debounced
}
