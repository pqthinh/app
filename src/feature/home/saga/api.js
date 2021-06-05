import { TIMEOUT, API_ENDPOINT } from "../../../config/url";
import axios from "axios";
import { firebase } from "../../../config";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const News = {
  async getProduct({ request }) {
    console.log(request, "request get product");
  },

  async getStory(request) {
    console.log(request, "request get sttory");
  },
};
