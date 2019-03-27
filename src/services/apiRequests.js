import axios from "axios";

export default function () {
  const API_ROOT = "https://www.anapioficeandfire.com/api/";
  const requestInfo = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return {
    books: {
      fetchAll: request => {
        let method = "get";
        let url = API_ROOT + "/books";
        return axios({
          method, url
        })
      }
    },

    characters: {
      fetchAll: request => {        
        let method = "get";
        let url = API_ROOT + "/characters";
        return axios({
          method, url
        })
      }
    },

    houses: {

    }
  }
}