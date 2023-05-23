import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useDishStore = defineStore('dish', {
    state: () => ({
        dishList: [],
        dishToEdit: null,
    }),
    actions: {
        async fetchDishList(category) {
            try {
                const dishes = (await axios.get('http://localhost:3030/dish/' + category)).data;
                this.dishList = dishes;
                console.log("dish list", dishes)
            } catch (e) {
                console.error(e);
                alert(e);
            }
        },
        setDishToEdit(dish) {
            this.dishToEdit = dish;
        },
        async deleteDish(name) {
            const userStore = useUserStore();
            try {
                const dishes = await axios.delete(`http://localhost:3030/dish/${name}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userStore.getToken,
                    }
                });
                console.log("new dishes", dishes);
                await this.fetchDishList();
            } catch (e) {
                console.error(e);
                alert(e);
            }
        },
        async createDish(dish) {
            const userStore = useUserStore();
            try {
                const res = await axios.post('http://localhost:3030/dish', dish, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + userStore.getToken,
                    }
                });
                if(res.status == 201) {
                    return res.data;
                }
            } catch(e) {
                console.log(e);
                alert(e);
            }
        },
        async editDish(dishName, dish) {
            const userStore = useUserStore();
            try {
                const res = await axios.put(`http://localhost:3030/dish/${dishName}`, dish, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + userStore.getToken,
                    }
                });
                if(res.status == 201) {
                    return res.data
                }
            } catch(e) {
                console.log(e);
                alert(e);
            }
        },
        async postPortionList(dishName, portions) {
            const userStore = useUserStore();
            try {
                const res = await axios.post(`http://localhost:3030/portion/${dishName}`, portions, { 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userStore.getToken,
                    }
                });
                if(res.status == 201) {
                    return res.data;
                }
            } catch (e) {
                console.log(e);
                alert(e);
            }
        }
    },
    getters: {
        getDishes: (state) => state.dishList,
        getDishToEdit: (state) => state.dishToEdit,
    }
})