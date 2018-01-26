import * as types from '../actions/action-types';

  // temporary
import parseTimelineData from '../schemas/timeline-schema';

export const initialState = {
  isFetching: false,
  dataPool: {},
  dataTypes: [],
  selectedDataType: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_TIMELINE:
      return {
        ...state,
        isFetching: true
      };

    case types.RECEIVE_TIMELINE: {
      const parsedData = parseTimelineData(action.payload);
      const dataTypes = Object.keys(parsedData);
      return {
        ...state,
        isFetching: false,
        dataPool: parsedData,
        dataTypes: ['ALL'].concat(dataTypes),
        selectedDataType: dataTypes.length ? 'ALL' : null
      };
    }

    case types.CHANGE_DATATYPE:
      return {
        ...state,
        selectedDataType: action.payload
      };

    default:
      return state;
  }
};
