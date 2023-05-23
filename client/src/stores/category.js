import axios from "axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        currentCategory: null,
        categoryList: [],
    }),
    actions: {
        async fetchCategories() {
            try {
                const categories = (await axios.get('http://localhost:3030/category')).data;
                this.categoryList = categories;
            } catch (e) {
                console.error(e);
                alert(e);
            }
        },
        setCurrentCategory(category) {
            this.currentCategory = category;
        },
        async postCategory(name) {
            const userStore = useUserStore();
            try {
                const res = await axios.post(`http://localhost:3020/category/${name}`, {
                    headers: {
                        'Authorization': 'Bearer ' + userStore.getToken,
                    }
                });
                if(res.status == 201) {
                    await this.fetchCategories();
                    console.log(res);
                }
            } catch (e) {
                console.error(e);
                alert(e);
            }
        }
    },
    getters: {
        getCategories(state) {
            console.log("categories", state.categoryList)
            return state.categoryList
        },
        getCurrentCategory(state) {
            return state.currentCategory
        }
    }
})