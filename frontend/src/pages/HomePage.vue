<template>
  <main>
    <div class="card">
      <div class="card-title">
        <h1>Nos Livres</h1>
        <h2>à lire et à relire ...</h2>
        <RouterLink :to="userConnected ? `/upload` : '/authentification'">
          <button class="btn add-btn" aria-label="Click to add a book"></button>
        </RouterLink>
      </div>

      <div class="books-thumbnails-container">
        <!-- Book display -->
        <div class="book-thumbnail" v-if="bookList.length > 0" v-for="(book, index) in bookList" :key="index">
          <RouterLink :to="'/books/' + book._id" class="book-link" >
            <div class="book-thumbnail-img-container">
              <img :src="book.imageUrl.toString()" :alt="book.title + ' image'" width="120px" height="140">
            </div>
            <div class= "book-thumbnail-informations">
              <div class= "book-thumbnail-rating">
                <!-- Rating stars fill -->
                <i v-for="n in 5" :key="n" class="fa-solid fa-star rating-star"
                  :class="{ 'filled': Number(book.averageRating) >= n }"></i>
              </div>
              <p class= "book-thumbnail-title">{{ book.title }}</p>
              <p class= "book-thumbnail-author">{{ book.author }}</p>
              <p class= "book-thumbnail-year">{{ book.year }}</p>
              <p class= "book-thumbnail-description">{{ book.genre }}</p>
            </div>
          </RouterLink>
        </div>
        <div id="loading" :class=" isLoading ? '' : 'hidden'">
        </div>
      </div>
    </div>
  </main>
</template>
<!----------------------------------- Script ------------------------------------>
<script setup lang="ts">
import { ref , computed } from 'vue';

// User states
// -----------------------------------------
import userSates from "../stored-datas/user-states.ts";
const storedUserStates = userSates();
const userConnected = computed(() => {
    return storedUserStates.logUserStates();
});

// Books display
// ---------------------------------------------
import { onMounted } from 'vue';
import  axios  from "axios";
import VITE_API_URL from "../env.ts";
// import dotenv from 'dotenv';// import { defineConfig } from 'vite'// dotenv.config();

const isLoading = ref(false);

interface Book  {
  _id: string;
  userId:  String,
  title:  String,
  author:  String,
  year:  Number,
  genre:  String,
  ratings: [
    {
      userId:  String,
      grade:  Number
    }
  ],
  imageUrl:  String,
  averageRating:  String
};
const bookList = ref<Book[]>([]);

// const booksFetcher = () => {
//   fetch(VITE_API_URL + "/api/books",  {method: 'GET'})
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//     bookList.value = data;
//     console.log(data[0].imageUrl, typeof(data[0].imageUrl))
//   })
//   .catch((error) => console.log(error))
// }

const booksFetcher = () => {
  axios.get(VITE_API_URL + "/api/books")
    .then((response) => {
      console.log(response.data);
      bookList.value = response.data;
    })
    .catch((error) => console.log(error));
};

onMounted(() => {
  booksFetcher()
})

</script>
<!----------------------------------- Style ------------------------------------>
<style scoped>
main {
  background: url(../assets/white-brown-library.webp) fixed;

  .card {
    gap: 40px;
    margin: 80px;
    padding: 40px;
    width: 100%;

    border-radius: 10px;

    .card-title {

      a {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          margin-top: 20px;
        }
      }
    }
  }
}

@media screen and (max-width: 460px) {
  main {
    background: none;
    position: relative;

    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      gap: 20px;
      margin: 0;
      padding: 20px;
      width: 100%;
      border-radius: 0;

      background: url(../assets/white-brown-library.webp) fixed;

      .card-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background: rgb(254, 254, 255);
        gap: 6px;
        padding: 6px;
        width: 86%;

        button {
          margin-top: 0;
        }

        border-radius:12px;
      }
    }
  }
}

#loading {
display: flex;
justify-content: center;
align-items: center;
height: 100px;
}

#loading.hidden {
display: none;
}

#loading {
width: 60px;
height: 60px;
border: 6px solid #d6d6d6;
border-top-color: #796157;
border-radius: 50%;
animation: spin 0.8s linear infinite;
margin: 24px auto;
}

   @keyframes spin {
to {
  transform: rotate(360deg);
}
}
</style>