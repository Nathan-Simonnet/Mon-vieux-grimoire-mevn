import { defineStore } from 'pinia'
import axios from 'axios'
import VITE_API_URL from '../env.ts'

type Book = {
  _id: string
  userId: string
  title: string
  author: string
  year: number
  genre: string
  ratings: { userId: string; grade: number }[]
  imageUrl: string
  averageRating: number
};

export const useBookStore = defineStore('book', {
  state: () => ({
    currentBook: null as Book | null
  }),
  actions: {
    async fetchBook(id: string) {
      const response = await axios.get(`${VITE_API_URL}/api/books/${id}`)
      this.currentBook = response.data
    },
    clearBook() {
      this.currentBook = null
    }
  }
});


