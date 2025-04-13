// src/composables/useImageUpload.ts
import { ref, computed } from 'vue';
import axios from 'axios';

 import VITE_API_URL from "../env.ts";

export function useImageUpload() {
  const imageUrl = ref<string | null>(null);
  const imageIsLoading = ref(false); // <-- Nouvel état de chargement
  const imageUrlFilled = computed(() => imageUrl.value);

  const uploadImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    imageIsLoading.value = true; // <-- Activation du statut "loading"
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${VITE_API_URL}/api/books/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageUrl.value = response.data.url;
      console.log("Image uploaded:", imageUrl.value);
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    } finally {
      imageIsLoading.value = false; // <-- Désactivation dans tous les cas (succès/erreur)
    }
  };

  return { 
    imageUrl, 
    imageIsLoading, // <-- Exposition de la ref
    imageUrlFilled, 
    uploadImage 
  };
}
