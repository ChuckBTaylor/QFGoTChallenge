import axios from "axios";
import { isObjectEmpty, constructQueryStringFromObj } from "../utils/utils";

export default function() {
  const API_ROOT = "https://www.anapioficeandfire.com/api";
  return {
    books: {
      fetchAll: () => {
        let method = "get";
        let url = API_ROOT + "/books?pageSize=20";
        return axios({
          method,
          url
        });
      }
    },

    characters: {
      fetch: payload => {
        let queryString = !isObjectEmpty(payload)
          ? "?" + constructQueryStringFromObj(payload)
          : "";
        let method = "get";
        let url = API_ROOT + "/characters" + queryString;
        return axios({
          method,
          url
        });
      },
      fetchOne: payload => {
        let method = "get";
        let url = API_ROOT + "/characters/" + payload.id;
        return axios({
          method,
          url
        });
      }
    },

    houses: {
      fetch: payload => {
        let queryString = !isObjectEmpty(payload)
          ? "?" + constructQueryStringFromObj(payload)
          : "";
        let method = "get";
        let url = API_ROOT + "/houses" + queryString;
        return axios({
          method,
          url
        });
      },
      fetchOne: payload => {
        let method = "get";
        let url = API_ROOT + "/houses/" + payload.id;
        return axios({
          method,
          url
        });
      }
    }
  };
}
