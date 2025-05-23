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

  return { loginSchema, registerSchema, validateMin, validateMax }
}
