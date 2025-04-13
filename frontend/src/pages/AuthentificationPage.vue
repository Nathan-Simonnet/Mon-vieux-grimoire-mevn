<template>
    <main>
        <div class="card">
            <div class="inputs-container">
                <label for="email-input">Adresse email</label>
                <div class="input-container" id="email-input-container">
                    <input type="text" id="email-input">
                </div>
                <label for="password-input">Mot de passe</label>
                <div class="input-container" id="password-input-container">
                    <input :type="showPassword ? 'text' : 'password'" id="password-input">
                    <span class="password-appear-btn" @click="togglePassword"></span>
                </div>
            </div>
            <div class="buttons-container">
                <button @click="signIn">Se connecter</button>
                <span>OU</span>
                <button @click="signUp">S'inscrire</button>
            </div>
        </div>
    </main>
</template>
<!-- ---------------------------- -->
<script setup lang='ts'>

import { ref } from 'vue';

const showPassword = ref(false);
const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const signIn = () => {
    console.log("Connecté !")
}

const signUp = () => {
    console.log("Inscrit !")
}

</script>
<!-- ---------------------------- -->
<style scoped>
main {
    background-color: #F2E3CE;

    .card {
        gap: 20px;
        width: 80%;
        padding: 40px;
        margin: 80px;
        
        border-radius: 2px;
        box-shadow: 0 4px 5px rgba(163, 163, 163, 0.3);

        .inputs-container {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            gap: 10px;
            width: 100%;

            .input-container {
                position: relative;
                width: 100%;
                height: 3rem;
                border-radius: 2px;

                input {
                    width: 100%;
                    height: 100%;
                    padding: 0 0 0 40px;
                }
            }

            .input-container::after {
                position: absolute;
                top: 50%;
                left: 20px;
                transform: translate(-50%, -50%);
                content: '';
                width: 20px;
                height: 20px;
                background-size: cover;
            }

            #email-input-container::after {
                background-image: url(../assets/user-icon-grey.png);
            }

            #password-input-container::after {
                background-image: url(../assets/lock-icon-grey.png);
            }

            .password-appear-btn {
                position: absolute;

                display: flex;
                justify-content: center;
                align-items: center;

                top: 50%;
                right: 0;
                transform: translate(-50%, -50%);
                width: 26px;
                height: 20px;

                background-image: url(../assets/originals/eye-slash-icon-grey.png);
                background-size: cover;

                cursor: pointer;
            }

            .password-appear-btn:hover {
                transform: scale(1.05) translate(-50%, -50%);
            }
        }

        .buttons-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            gap: 20px;

            button {
                padding: 16px 16px;
                font-size: 1rem;
            }
        }
    }
}

@media screen and (max-width: 600px) {
    main {
        background-color: #F2E3CE;

        .card {
            gap: 20px;
            padding: 20px;
            margin: 40px;

            background-color: rgb(249, 242, 239);
            border-radius: 2px;

            .inputs-container {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;

                gap: 5px;
                width: 100%;

                .input-container {
                    position: relative;
                    width: 100%;
                    height: 2rem;
                    border-radius: 2px;

                    input {
                        width: 100%;
                        height: 100%;
                        padding: 0 0 0 20px;
                    }
                }

                .input-container::after {
                    top: 50%;
                    left: 10px;
                    width: 14px;
                    height: 14px;
                }

                .password-appear-btn {
                    width: 20px;
                    height: 16px;
                }
            }

            .buttons-container {
                flex-direction: column;
                gap: 10px;

                button {
                    padding: 10px 20px;
                    font-size: 0.9rem;
                }
            }
        }
    }


}
</style>