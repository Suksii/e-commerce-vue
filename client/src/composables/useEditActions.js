import { ref } from 'vue'

const editMode = ref(null)

const handleEdit = (id) => {
  editMode.value = id
}
const cancel = () => {
  editMode.value = null
}

export const useEditActions = () => {
  return { id: editMode, handleEdit, cancel }
}
