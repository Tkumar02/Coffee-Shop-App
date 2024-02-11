import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import BeansData from "../data/BeansData";
import CoffeeData from "../data/CoffeeData";

export const useStore = create(
    persist(
        () => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            CartPrice:0,
            FavoriteList: [],
            CartList: [],
            OrderHistoryList: [],
        }),
        {
            name: 'coffee-app',
            storage: createJSONStorage(()=>AsyncStorage)
        },
    ),
);