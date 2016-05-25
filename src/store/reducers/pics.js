import 'whatwg-fetch'

const initialState = []

const callFinished = 'CALLFINISHED'

function parseBodyToJson (response) {
  return response.json().then(function (json) {
    response.responseBody = json
    return response
  })
}

export default function reduce (state = initialState, action) {
  switch (action.type) {
    case callFinished:
      return action.payload
    default:
      return state
  }
}

export function apiCall () {
  return (dispatch, getState) => {
    fetch('https://trays-proxy-2.herokuapp.com/https://dev.maketrays.com/api/loadBrowse').then(parseBodyToJson).then(function (response) {
      dispatch({
        type: callFinished,
        payload: response.responseBody
      })
    })
  }
}
