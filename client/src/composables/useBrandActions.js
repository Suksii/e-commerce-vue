import { ref } from 'vue'

const editMode = ref(null)

const handleEdit = (id) => {
  editMode.value = id
}

export const useBrandActions = () => {
  return { id: editMode, handleEdit }
}
