import * as types from "./actionType";

export function getStory(response) {
  console.log(response, "reponse get stories");
  return { type: types.GET_STORY_LIST, response };
}

export function getProduct(response) {
  console.log(response, "reponse get producr");
  return { type: types.GET_PRODUCT_lIST, response };
}

export function fetchData(payload) {
  return { type: types.FETCH_DATA, payload };
}
