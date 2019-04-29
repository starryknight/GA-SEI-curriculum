import axios from 'axios'

export function queryTVMazeAPI (query) {
  // fill url in with a URL based on the example at: 
  // https://www.tvmaze.com/api#show-search
  // replace a part of the example URL with the user input, which you can 
  // assume will be the parameter of this function, `query`
  const url = `http://api.tvmaze.com/search/shows?q=${query}`
  return axios.get(url) //make sure to return something
        .then(response => {
            return response
        })
}