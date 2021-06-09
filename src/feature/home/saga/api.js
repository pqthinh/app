import { TIMEOUT, API_ENDPOINT, BASE_URL } from "../../../config/url";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const News = {
  async getProduct({ request }) {
    console.log(request, "request get news");
    const data = axios.get(`${BASE_URL}/tindang`);
    const res = {};
    res.data = data;
    return res;
  },

  async getStory(request) {
    console.log(request, "request get story");
    const data = axios.get(`${BASE_URL}/tindang`);
    const res = {};
    res.data = data;
    return res;
  },
};

export default News;
