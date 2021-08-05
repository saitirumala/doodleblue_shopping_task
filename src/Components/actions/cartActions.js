import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
  SEARCH_ITEM,
  SHOW_DETAILS,
  ITEMS_SORT
} from "./action-types/cart-actions";

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
    itemAdded: false
  };
};

export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    id
  };
};

export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

export const subQuantity = (id) => {
  return {
    type: SUB_QUANTITY,
    id
  };
};

export const searchstr = (value) => {
  return {
    type: SEARCH_ITEM,
    value
  };
};

export const itemDetail = (id) => {
  return {
    type: SHOW_DETAILS,
    payload: id
  };
};

export const itemSort = (id) => {
  return {
    type: ITEMS_SORT,
    payload: id
  };
};
