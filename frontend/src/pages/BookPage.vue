<template>
    <main>
        <BackArrowLayout></BackArrowLayout>
        <div class="card">
            <div class="book" v-if="bookStore.currentBook != null">
                <div class="book-img-container">
                    <img class="book-img" :src="bookStore.currentBook.imageUrl" :alt="bookStore.currentBook.title + ' image'" width="220px"
                        height="280">
                </div>
                <div class="book-informations-actions-rating">
                    <div class="book-actions-and-label-container">
                        <p>Vous avez publié cet ouvrage, vous pouvez le :</p>
                        <div class="book-actions-container">
                            <RouterLink :to="`/books/${bookStore.currentBook._id}/edit`"><span class="book-action"
                                    id="update-book-span">modifier</span>
                            </RouterLink>
                            <span tabindex="0" class="book-action" id="delete-book-span" @click="showModal"
                                @keyup.enter="showModal">supprimer</span>
                        </div>
                    </div>
                    <div class="book-informations">
                        <p class="book-title">{{ bookStore.currentBook.title }}</p>
                        <div class="book-title-and-author">
                            <p class="book-author">{{ bookStore.currentBook.author }} - {{ bookStore.currentBook.year }}</p>
                        </div>
                        <div class="book-description-and-rating">
                            <p class="book-description">{{ bookStore.currentBook.genre }}</p>
                            <div class="book-rating">
                                <!-- Rating stars fill -->
                                <i v-for="n in 5" :key="n" class="fa-solid fa-star rating-star"
                                    :class="{ 'filled': bookStore.currentBook.averageRating >= n }"></i>
                            </div>
                        </div>
                    </div>
                    <div class="book-rating-and-label-container">
                        <h3>Votre note</h3>
                        <div class="book-rating-container" id="user-rating-container">
                            <i v-for="n in 5" :key="n" class="fa-solid fa-star rating-star"
                                :class="{ 'filled': userRating >= n }"></i>
                        </div>
                    </div>
                </div>

                <div id="book-modal" :class="{ 'hidden': !ModalIsVisible }">
                    <h3>Êtes vous sure de vouloir supprimer ce livre ?</h3>
                    <img src="../assets/delete-book.jpg" alt="trash can image" width="120px">
                    <div>
                        <button @click="() => deleteBook()" @keyup.enter="() => deleteBook()">OUI</button>
                        <button @click="hideModal" @keyup.enter="hideModal">NON</button>
                    </div>
                    <p v-if="deleteBookFailed">{{ deletedBokkMessage }}</p>
                </div>
            </div>
            <hr>
            <div class="best-rated-container">
                <h2>Les mieux notés</h2>
                <div class="books-thumbnails-container best-rated-books-thumbnail-container">
                    <!-- Book display -->
                    <div class="book-thumbnail" v-for="(book, index) in bestRatedBookList" :key="index">
                        <RouterLink :to="'/books/' + book?._id" class="book-link" target="_blank">
                            <div class="book-thumbnail-img-container">
                                <img :src="book?.imageUrl" :alt="book?.title + ' image'" width="120px" height="140">
                            </div>
                            <div class="book-thumbnail-informations">
                                <div class="book-thumbnail-rating">
                                    <!-- Rating stars fill -->
                                    <i v-for="n in 5" :key="n" class="fa-solid fa-star rating-star"
                                        :class="{ 'filled': book?.averageRating >= n }"></i>
                                </div>
                                <p class="book-thumbnail-title">{{ book?.title }}</p>
                                <p class="book-thumbnail-author">{{ book?.author }}</p>
                                <p class="book-thumbnail-year">{{ book?.year }}</p>
                                <p class="book-thumbnail-description">{{ book?.genre }}</p>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<!------------------------------ Script ---------------------------- -->
<script setup lang="ts">
// import "./book-page.css";
import { onMounted, ref, computed } from 'vue';
import BackArrowLayout from "../components/BackArrowLayout.vue";
import { useBookStore } from "../stored-datas/bookStore.ts";

const bookStore = useBookStore();

interface Book {
    _id: string;
    userId: String,
    title: string,
    author: string,
    year: number,
    genre: string,
    ratings: [
        {
            userId: string,
            grade: number
        }
    ],
    imageUrl: string,
    averageRating: number
};

// const book = ref<Book | null>(null);
    const userRating = computed(() => {
    const book = bookStore.currentBook;  // Utilise currentBook ici
    if (!book) return 0;

    const foundRating = book.ratings.find(rating => rating.userId === book.userId);
    return foundRating ? foundRating.grade : 0;
});

// const bookList = ref([
//     {
//         _id: "XYZ9876",
//         userId: "123456789ABCDEF",
//         title: "Le seigneur des anneaux - les 2 tours",
//         author: "JRR Tolkien",
//         year: 2002,
//         genre: "Fantasy aventure",
//         ratings: [
//             {
//                 userId: "123456789ABCDEF",
//                 grade: 5,
//             },
//         ],
//         imageUrl: "https://res.cloudinary.com/dj0cryrxy/image/upload/v1743001286/Les_deux_tours_1743001286062.webp",
//         averageRating: 4,
//     },
//     {
//         _id: "XYZ9876",
//         userId: "123456789ABCDEF",
//         title: "La petite maison dans la prairie",
//         author: "Stephane King et d'autres voilà",
//         year: 2002,
//         genre: "Aventure romantique",
//         ratings: [
//             {
//                 userId: "123456789ABCDEF",
//                 grade: 5, // min/max MODIF
//             },
//         ],
//         imageUrl: "https://res.cloudinary.com/dj0cryrxy/image/upload/v1742914698/maison_1742914698602.webp",
//         averageRating: 3, // min/max MODIF
//     },
//     {
//         _id: "XYZ9876",
//         userId: "123456789ABCDEF",
//         title: "Le seigneur des anneaux - les 2 tours",
//         author: "JRR Tolkien",
//         year: 2002,
//         genre: "Fantasy aventure",
//         ratings: [
//             {
//                 userId: "123456789ABCDEF",
//                 grade: 5, // min/max MODIF
//             },
//         ],
//         imageUrl: "https://res.cloudinary.com/dj0cryrxy/image/upload/v1743001286/Les_deux_tours_1743001286062.webp",
//         averageRating: 5, // min/max MODIF
//     },
//     {
//         _id: "XYZ9876",
//         userId: "123456789ABCDEF",
//         title: "La petite maison dans la prairie",
//         author: "Stephane King et d'autres voilà",
//         year: 2002,
//         genre: "Aventure romantique",
//         ratings: [
//             {
//                 userId: "123456789ABCDEF",
//                 grade: 5, // min/max MODIF
//             },
//         ],
//         imageUrl: "https://res.cloudinary.com/dj0cryrxy/image/upload/v1742914698/maison_1742914698602.webp",
//         averageRating: 1, // min/max MODIF
//     },
//     {
//         _id: "XYZ9876",
//         userId: "123456789ABCDEF",
//         title: "Le seigneur des anneaux - les 2 tours",
//         author: "JRR Tolkien",
//         year: 2002,
//         genre: "Fantasy aventure",
//         ratings: [
//             {
//                 userId: "123456789ABCDEF",
//                 grade: 5, // min/max MODIF
//             },
//         ],
//         imageUrl: "https://res.cloudinary.com/dj0cryrxy/image/upload/v1743001286/Les_deux_tours_1743001286062.webp",
//         averageRating: 4, // min/max MODIF
//     },
//     {
//         _id: "XYZ9876",
//         userId: "123456789ABCDEF",
//         title: "La petite maison dans la prairie",
//         author: "Stephane King et d'autres voilà",
//         year: 2002,
//         genre: "Aventure romantique",
//         ratings: [
//             {
//                 userId: "123456789ABCDEF",
//                 grade: 5, // min/max MODIF
//             },
//         ],
//         imageUrl: "https://res.cloudinary.com/dj0cryrxy/image/upload/v1742914698/maison_1742914698602.webp",
//         averageRating: 4, // min/max MODIF
//     },
// ]);
const bookList = ref<Book[]>([]);
const bestRatedBookList = computed(() => {
    return bookList.value.slice(0, 3);
});

// Fetch
// =========================================
import axios from "axios";
import { useRoute } from 'vue-router';
import VITE_API_URL from "../env.ts";
const route = useRoute();
const bookId = route.params.id;

// const bookFetcher = () => {
//     axios.get(VITE_API_URL + "/api/books/" + bookId)
//         .then((response) => {
//             book.value = response.data;
//         })
//         .catch((error) => console.log(error));
// };

const booksFetcher = () => {
    axios.get(VITE_API_URL + "/api/books")
        .then((response) => {
            // Sort by averageRating
            bookList.value = [...response.data].sort((a, b) =>
                a.averageRating > b.averageRating ? -1 : 1
            );
            // Sort by averageRating + title
            // bookList.value = [...response.data].sort((a, b) => {
            //     const ratingDiff = (b.averageRating || 0) - (a.averageRating || 0);
            //     if (ratingDiff !== 0) return ratingDiff; // Prioritize rating difference
            //     return a.title.localeCompare(b.title); // Alphabetical if ratings are equal
            // });

        })
        .catch((error) => console.log(error));
};

onMounted(() => {
    bookStore.fetchBook(bookId as string);
    // bookFetcher();
    booksFetcher();
})

// Modal
// ==========================
import { useRouter } from 'vue-router';
const router = useRouter();
const deleteBookFailed = ref(false)
const deletedBokkMessage = ref("")

const ModalIsVisible = ref(false);

const showModal = () => {
    ModalIsVisible.value = true;
};
const hideModal = () => {
    ModalIsVisible.value = false;
};
const deleteBook = () => {
    console.log('delete processing');

    axios.delete(VITE_API_URL + "/api/books/" + bookId)
        .then((response) => {
            if (response.status === 200) {
                console.log("deleted : ", response.data);
                router.push('/books/deleted')
            } else {
                console.log(response.status);
                deleteBookFailed.value = true;
                deletedBokkMessage.value = `Error ${response.status} : Refresh or try again later`
            }
        })
        .catch((error) => {
            console.log(error)
            deleteBookFailed.value = true;
            deletedBokkMessage.value = "The server is not responding... Refresh or try again later"
        });

};


</script>
<!------------------------------ Style ---------------------------- -->
<style scoped>
main {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 0 80px 80px 80px;

    background-color: #F2E3CE;

    .card {
        gap: 20px;
        width: 100%;
        padding: 40px;

        border-radius: 6px;
        box-shadow: 0 4px 5px rgba(163, 163, 163, 0.3);

        .book {

            display: flex;
            justify-content: space-around;
            align-items: center;

            position: relative;

            gap: 40px;
            width: 100%;

            .book-img-container {
                flex: 2;

                display: flex;
                justify-content: center;
                align-items: center;

                .book-img {
                    object-fit: cover;
                }
            }

            .book-informations-actions-rating {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                gap: 2px;
                flex: 3;
                height: 100%;



                .book-actions-and-label-container,
                .book-informations,
                .book-rating-and-label-container {
                    width: 100%;
                }

                .book-actions-and-label-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    text-align: left;

                    gap: 10px;

                    .book-actions-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        gap: 10px;

                        .book-action {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            font-style: italic;
                            cursor: pointer;
                        }

                        .book-action:hover {
                            text-decoration: underline;
                        }

                        #update-book-span {
                            color: rgb(83, 83, 83);
                        }

                        #delete-book-span {
                            color: rgb(151, 0, 0);
                        }
                    }

                }

                .book-informations {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: left;

                    gap: 4px;

                    .book-title,
                    .book-title-and-author,
                    .book-description-and-rating {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        width: 100%;
                        padding: 10px 0;
                    }

                    .book-description-and-rating {
                        gap: 20px;
                    }
                }

                .book-rating-and-label-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 20px 0;
                    gap: 20px;
                    background: rgb(248, 243, 239);

                    .book-rating-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 2px;
                        border-radius: 2px;
                    }
                }
            }
        }

        hr {
            width: 60%;
        }

        .best-rated-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;

            gap: 20px;

            h2 {
                font-weight: 500;
            }
        }
    }

}

#book-modal {
    z-index: 9;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
    background: rgb(243, 227, 207);
}

#book-modale img {
    position: relative;
}


#book-modal div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
}

#book-modal div button {
    width: 25%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

#book-modal.hidden {
    display: none;
}

@media screen and (max-width: 800px) {
    main {
        .card {

            .book {
                flex-direction: column;

                .book-img-container {
                    flex: 1;

                    .book-img {
                        object-fit: cover;
                    }
                }

                .book-informations-actions-rating {
                    /* width: 100%; */
                    flex: 1;

                }
            }

            hr {
                width: 60%;
            }

            .best-rated-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;

                gap: 20px;

                h2 {
                    font-weight: 500;
                }
            }
        }
    }
}

@media screen and (max-width: 600px) {
    main {
        padding: 0 40px 40px 40px;

        .card {
            padding: 20px;
            background-color: rgb(248, 243, 239);
        }
    }
}

@media screen and (max-width: 400px) {
    main {
        padding: 0 0 40px 0;

        .card {
            padding: 20px;
        }
    }
}
</style>