import { defineStore } from "pinia";

export const usePortionStore = defineStore('portion', {
    state: () => ({
        portionList: []
    }),
    actions: {
        addPortion(amount, measure, cost) {
            const existing = this.portionList
                .find(p => p.amount == amount && p.cost == cost && p.measure == measure)
            if(existing)
                return;
            
            this.portionList.push({
              amount: amount,
              measure: measure,
              cost: cost
            });
        },
        removePortion(portion) {
            const index = this.portionList.findIndex(p => p.amount == portion.amount && p.cost == portion.cost && p.measure == portion.measure);
            this.portionList.splice(index, 1);
        },
        setPortionList(list) {
            this.portionList = list;
        }
    },
    getters: {
        getPortionList: (state) => state.portionList,
    }
})