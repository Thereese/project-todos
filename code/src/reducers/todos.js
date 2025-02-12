import { createSlice } from "@reduxjs/toolkit";

const todos = createSlice({
  name: 'todos',
  initialState: {
    items: []
  },

  reducers: {
    toggleItem: (store, action) => {
      store.items.forEach((item) => {
        if (item.id === action.payload) {
          item.isDone = !item.isDone
        }
      })
    },

    addTask: (store, action) => {
      store.items.push(action.payload)
    }, 

    deleteItem: (store, action) => {
      store.items.splice(action.payload, 1)
    },

    deleteAll: (store, action) => {
      store.items.splice(action.payload)
    },
    
    checkAll: (store) => {
      store.items.forEach((item) => {
        item.isDone = true
      })
    }
  }
});

export default todos;