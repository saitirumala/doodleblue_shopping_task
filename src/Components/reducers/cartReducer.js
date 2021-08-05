import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING,
  SEARCH_ITEM,
  SHOW_DETAILS
} from "../actions/action-types/cart-actions";
import data from "./products.json";

const initState = {
  items: data,
  itemsInCart: [],
  total: 0,
  quantity: 0,
  filterItems: []
};

const cartReducer = (state = initState, action) => {
  console.log('state :>> ', state);
  switch (action.type) {
    case ADD_TO_CART: {
      let addItem = state.items.find((item) => action.id === item.id);
      let item_exsist = state.itemsInCart.find((item) => action.id === item.id);
      state.items.map((value) => {
        if (value.id === action.id) {
          return (value["inCart"] = value["inCart"] ? false : true);
        }
        return value["inCart"];
      });
      if (item_exsist) {
        addItem.quantity += 1;
        let newTotal = state.total + addItem.price;
        return {
          ...state,
          total: newTotal,
          itemAdded: true
        };
      } else {
        addItem.quantity = 1;
        let newTotal = state.total + addItem.price;
        return {
          ...state,
          total: newTotal,
          itemsInCart: [...state.itemsInCart, addItem],
          quantity: state.quantity + 1
        };
      }
    }

    case REMOVE_ITEM: {
      let removeItem = state.itemsInCart.find((item) => item.id === action.id);
      let newItem = state.itemsInCart.filter((item) => action.id !== item.id);
      let newTotal = state.total - removeItem.price * removeItem.quantity;
      state.items[action.id].inCart = false;

      return {
        ...state,
        total: newTotal,
        itemsInCart: newItem,
        quantity: state.quantity - 1
      };
    }

    case ADD_QUANTITY: {
      let addItem = state.items.find((item) => item.id === action.id);
      addItem.quantity += 1;
      let newTotal = state.total + addItem.price;
      return {
        ...state,
        total: newTotal
      };
    }

    case SUB_QUANTITY: {
      let addItem = state.items.find((item) => action.id === item.id);
      if (addItem.quantity === 1) {
        let newItem = state.itemsInCart.filter((item) => item.id !== action.id);
        let newTotal = state.total - addItem.price;
        state.items[action.id].inCart = false;
        return {
          ...state,
          total: newTotal,
          itemsInCart: newItem,
          quantity: state.quantity - 1
        };
      } else {
        addItem.quantity -= 1;
        let newTotal = state.total - addItem.price;
        return {
          ...state,
          total: newTotal
        };
      }
    }

    case ADD_SHIPPING: {
      return {
        ...state,
        total: state.total + 30
      };
    }

    case SUB_SHIPPING: {
      return {
        ...state,
        total: state.total - 30
      };
    }

    case SEARCH_ITEM: {
      const searchQuery = action.value.trim().toLowerCase();
      // console.log(action.value);

      let items = [...data];
      if (searchQuery.length > 0) {
        items = items.filter((item) => {
          return item.title.toLowerCase().match(searchQuery);
        });
      } else {
        items = data;
      }

      return {
        ...state,
        searchQuery,
        items
      };
    }

    case SHOW_DETAILS: {
      let data = action.payload;
      return {
        ...state,
        data
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
