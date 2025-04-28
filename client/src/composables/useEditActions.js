import { ref } from 'vue'

const editMode = ref(null)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleEdit = (id) => {
  editMode.value = id
  scrollToTop()
}
const cancel = () => {
  editMode.value = null
}

export const useEditActions = () => {
  return { id: editMode, handleEdit, cancel }
}
