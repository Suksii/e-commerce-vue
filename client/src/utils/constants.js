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
        gender: 'Men',
      },
      {
        id: 2,
        title: 'Clothes for men',
        category: 'Clothes',
        gender: 'Men',
      },
      {
        id: 3,
        title: 'Equipment for men',
        category: 'Equipment',
        gender: 'Men',
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
        gender: 'Women',
      },
      {
        id: 2,
        title: 'Clothes for women',
        category: 'Clothes',
        gender: 'Women',
      },
      {
        id: 3,
        title: 'Equipment for women',
        category: 'Equipment',
        gender: 'Women',
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
