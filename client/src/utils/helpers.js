import { BASE_IMAGE_URL } from './constants'

export const getImageUrl = (folder, image) => {
  return `${BASE_IMAGE_URL}${folder}/${image}`
}
