import { onBeforeUnmount, ref, watch } from 'vue'

export const useDebounce = (value, delay) => {
  const debouced = ref(value.value)
  let timeout

  const clear = () => {
    if (timeout) clearTimeout(timeout)
  }

  watch(value, (newValue) => {
    clear()
    timeout = setTimeout(() => {
      debouced.value = newValue
    }, delay)
  })

  onBeforeUnmount(() => {
    clear()
  })

  return debouced
}
