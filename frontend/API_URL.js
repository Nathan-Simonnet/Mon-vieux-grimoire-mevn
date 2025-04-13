const API_URL = 'http://localhost:3000';

export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/auth/signup`, // POST:
    SIGN_IN: `${API_URL}/api/auth/login`, //POST
    BOOKS: `${API_URL}/api/books`, //GET //POST
    // GET /:id
    // DELETE /:id
    // PUT /:id 
    BEST_RATED: `${API_URL}/api/books/bestrating`, //GET
    // POST /api/books/:id/rating
};

export const APP_ROUTES = {
    SIGN_UP: '/Inscription',
    SIGN_IN: '/Connexion',
    ADD_BOOK: '/Ajouter',
    BOOK: '/livre/:id',
    UPDATE_BOOK: 'livre/modifier/:id',
};
