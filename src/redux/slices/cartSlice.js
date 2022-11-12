import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const exstingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            state.totalQuantity++
            if(!exstingItem){
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    image: newItem.imgUrl,
                    price: newItem.price,
                    quantity:1,
                    totalPrice: newItem.price
                })
            }
            else{
                exstingItem.quantity++
                exstingItem.totalPrice = Number(exstingItem.totalPrice) + Number(newItem.price)
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item)=> total + Number(item.price)*Number(item.quantity))
            }
    }
});

export const cartActions = cartSlice.actions
export default cartSlice.reducer