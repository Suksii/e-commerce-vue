import { ref } from 'vue'

export const useHoverActions = () => {
  const displayedAction = ref(null)

  const showActions = (id) => {
    displayedAction.value = id
  }

  const hideActions = () => {
    displayedAction.value = null
  }

  return { displayedAction, showActions, hideActions }
}
