import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
    }),
    actions: {
        fetchTokenFromLocalStorage() {
            const token = localStorage.getItem('token');
            if(token) {
                this.token = token;
            }
        },
        async tryLogin(email, password) {
            try {
                const data = {
                    email,
                    password,
                }
                const res = await axios.post("http://localhost:3030/auth/login", data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log("login", res);
                if(res.status == 200) {
                    this.token = res.data.token;
                    localStorage.setItem('token', this.token);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async tryRegister(user) {
            try {
                const res = await axios.post("http://localhost:3030/auth/register", user, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(res.status == 200) {
                    return res.data;
                }
            } catch(e) {
                console.log(e);
                alert(e);
            }
        }
    },
    getters: {
        getToken: (state) => state.token,
    }
})