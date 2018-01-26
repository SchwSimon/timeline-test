import * as types from './action-types';
  // TMP for the data fetch
import * as TIMELINE_DATA_TMP from '../__MOCKS__/timeline.json';

export const changeDataType = dataType => ({
  type: types.CHANGE_DATATYPE,
  payload: dataType
});

export const requestTimeline = () => ({
  type: types.REQUEST_TIMELINE
});

export const receiveTimeline = timeline => ({
  type: types.RECEIVE_TIMELINE,
  payload: timeline
});

export const fetchTimeline = date => (dispatch => {
  dispatch(requestTimeline());

  // here would be the data fetch()...
  return dispatch(receiveTimeline(TIMELINE_DATA_TMP))

  // return fetch('https://.....')
  //   .then(response => response.json())
  //   .then(resultJson => dispatch(receiveTimeline(resultJson)))
});
