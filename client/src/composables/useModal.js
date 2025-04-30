import { ref } from 'vue'

export const useModal = () => {
  const showModal = ref(null)

  const handleShowModal = (item) => {
    showModal.value = item
  }
  const handleCloseModal = () => {
    showModal.value = null
  }

  return { showModal, handleShowModal, handleCloseModal }
}
