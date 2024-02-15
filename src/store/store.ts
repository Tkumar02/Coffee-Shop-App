
import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import BeansData from "../data/BeansData";
import CoffeeData from "../data/CoffeeData";

export const useStore = create(
    persist(
        (set,get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            CartPrice:0,
            FavouriteList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart:(cartItem:any) =>
                set(
                    produce(state=>{
                        let found = false;
                        for(let i=0;i<state.CartList.length;i++){
                            if(state.CartList[i].id == cartItem.id){
                                found=true;
                                let size=false;
                                for(let j=0;j<state.CartList[i].prices.length;j++){
                                    if(state.CartList[i].prices[j].size == cartItem.prices[0].size){
                                        size=true;
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                                if(size==false){
                                    state.CartList[i].prices.push(cartItem.prices[0])
                                }
                                state.CartList[i].prices.sort((a:any,b:any)=>{
                                    if(a.size>b.size){
                                        return -1;
                                    }
                                    if(a.size<b.size){
                                        return 1;
                                    }
                                    return 0;
                                });
                                break;
                            }
                        }
                        if(found==false){
                            state.CartList.push(cartItem);
                        }
                    }),
                ),
                calculateCartPrice: ()=> set(produce(state=>{
                    let totalPrice = 0;
                    for(let i=0;i<state.CartList.length;i++){
                        let tempprice = 0;
                        for(let j=0;j<state.CartList[i].prices.length;j++){
                            tempprice = tempprice + 
                                parseFloat(state.CartList[i].prices[j].price)*
                                    state.CartList[i].prices[j].quantity;
                        }
                        state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
                        totalPrice = totalPrice+tempprice
                    }
                    state.CartPrice = totalPrice.toFixed(2).toString();
                }),
            ),
            addToFavouriteList: (type:string,id:string)=>
                set(produce(state=>{
                    if(type=='Coffee'){
                        for(let i=0;i<state.CoffeeList.length;i++){
                            if(state.CoffeeList[i].id==id){
                                if(state.CoffeeList[i].favourite == false){
                                    state.CoffeeList[i].favourite = true;
                                    state.FavouriteList.unshift(state.CoffeeList[i]);
                                }
                                break;
                            }
                        }
                    }else if (type=='Bean'){
                        for(let i=0;i<state.BeanList.length;i++){
                            if(state.BeanList[i].id==id){
                                if(state.BeanList[i].favourite == false){
                                    state.BeanList[i].favourite = true;
                                    state.FavouriteList.unshift(state.BeanList[i]);
                                }
                                break;
                            }
                        }
                    }
                }),
            ),
            deleteFromFavouriteList: (type:string,id:string) =>
                set(produce(state=>{
                    if(type='Coffee'){
                        for(let i=0;i<state.CoffeeList.length;i++){
                            if(state.CoffeeList[i].id==id){
                                if(state.CoffeeList[i].favourite == true){
                                    state.CoffeeList[i].favourite = false;
                                }
                                break;
                            }
                        }
                    } else if (type=='Bean'){
                        for(let i=0;i<state.BeanList.length;i++){
                            if(state.BeanList[i].id==id){
                                if(state.BeanList[i].favourite == true){
                                    state.BeanList[i].favourite = false;
                                }
                                break;
                            }
                        }
                    }
                    let spliceIndex = -1;
                    for(let i=0;i<state.FavoriteList.length;i++){
                        if(state.FavoriteList[i].id == id){
                            spliceIndex = i;
                            break;
                        }
                    }
                    state.FavoriteList.splice(spliceIndex,1);
                }),
            ),
        }),
        {
            name: 'coffee-app',
            storage: createJSONStorage(()=>AsyncStorage)
        },
    ),
);