import { useProductsStore } from '@/stores/products'
import * as zod from 'zod'

export const useValidation = () => {
  const productsStore = useProductsStore()

  const registerSchema = zod
    .object({
      email: zod
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Must be a valid email' }),
      username: zod.string().min(1, { message: 'Username is required' }),
      password: zod
        .string()
        .min(1, { message: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 letters' }),
      confirmPassword: zod.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })

  const loginSchema = zod.object({
    username: zod.string().min(1, { message: 'Username is required' }),
    password: zod
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 letters' }),
  })

  const brandSchema = zod.object({
    name: zod.string().min(2, { message: 'Brand name is required' }),
    image: zod.string().min(2, { message: 'Brand image is required' }),
  })

  const productSchema = zod.object({
    name: zod.string().min(1, { message: 'Product name is required' }),
    price: zod.number().min(1, { message: 'Product price is required' }),
    images: zod
      .array(zod.string())
      .min(1, { message: 'At least one image is required' })
      .max(5, { message: 'You can upload a maximum of 5 images' }),
    category: zod.string().min(1, { message: 'Product category is required' }),
    gender: zod.string().min(1, { message: 'Product gender is required' }),
    description: zod.string().min(1, { message: 'Product description is required' }),
    brand: zod.string().min(1, { message: 'Product brand is required' }),
  })

  const validateMin = (e) => {
    const value = +e.target.value
    if (value + 10 <= productsStore.selectedMax) {
      productsStore.selectedMin = value
    } else {
      productsStore.selectedMin = productsStore.selectedMax - 10
    }
  }
  const validateMax = (e) => {
    const value = +e.target.value
    if (value - 10 >= productsStore.selectedMin) {
      productsStore.selectedMax = value
    } else {
      productsStore.selectedMax = productsStore.selectedMin + 10
    }
  }

  return { loginSchema, registerSchema, brandSchema, productSchema, validateMin, validateMax }
}
