import { defineStore } from "pinia";
import { ref } from 'vue'

const userSates = defineStore("userSate", () => {

    const isUserConnected = ref(true);

    const logUserStates = () => {
        return isUserConnected.value;
    }

    const changeUserStates = () => {
        isUserConnected.value = !isUserConnected.value;
    }

    return {
        isUserConnected,
        logUserStates,
        changeUserStates
    }

})

export default userSates;