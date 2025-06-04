import Woman from '../assets/woman.jpg'
import Man from '../assets/man.jpg'
import Kid from '../assets/kid.jpg'

export const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL

export const categoryItems = [
  {
    id: 1,
    image: Man,
    list: [
      {
        id: 1,
        title: 'Shoes for men',
        category: 'Footwear',
        gender: 'Male',
      },
      {
        id: 2,
        title: 'Clothes for men',
        category: 'Clothes',
        gender: 'Male',
      },
      {
        id: 3,
        title: 'Equipment for men',
        category: 'Equipment',
        gender: 'Male',
      },
    ],
  },
  {
    id: 2,
    image: Woman,
    list: [
      {
        id: 1,
        title: 'Shoes for women',
        category: 'Footwear',
        gender: 'Female',
      },
      {
        id: 2,
        title: 'Clothes for women',
        category: 'Clothes',
        gender: 'Female',
      },
      {
        id: 3,
        title: 'Equipment for women',
        category: 'Equipment',
        gender: 'Female',
      },
    ],
  },
  {
    id: 3,
    image: Kid,
    list: [
      {
        id: 1,
        title: 'Shoes for kids',
        category: 'Footwear',
        gender: 'Kids',
      },
      {
        id: 2,
        title: 'Clothes for kids',
        category: 'Clothes',
        gender: 'Kids',
      },
      {
        id: 3,
        title: 'Equipment for kids',
        category: 'Equipment',
        gender: 'Kids',
      },
    ],
  },
]
