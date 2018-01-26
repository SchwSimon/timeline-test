import sinon from 'sinon';
import reducer, { initialState } from '../../reducers/timeline-reducer';
import * as types from '../../actions/action-types';
import parseTimelineData from '../../schemas/timeline-schema';

describe('reducer: layers', () => {
  const defaultState = {
    isFetching: false,
    dataPool: {},
    dataTypes: [],
    selectedDataType: null
  };

  it('initial state', () => {
    expect(initialState).toEqual(defaultState);
  });

	it('return initialState on default action', () => {
    expect(reducer(undefined, {type: null})).toEqual(defaultState);
  });

  it('REQUEST_TIMELINE', () => {
    const action = {
      type: types.REQUEST_TIMELINE
    };
    const state = {
      ...defaultState,
      isFetching: true
    };
    expect(reducer(undefined, action)).toEqual(state);
  });

  it('RECEIVE_TIMELINE', () => {
    const action = {
      type: types.RECEIVE_TIMELINE,
      payload: null
    };
    const state = {
      ...defaultState,
      isFetching: false,
      dataPool: parseTimelineData({}),
      dataTypes: ['ALL'],
      selectedDataType: null
    };
    expect(reducer(undefined, action)).toEqual(state);
  });

  it('CHANGE_DATATYPE', () => {
    const action = {
      type: types.CHANGE_DATATYPE,
      payload: 'type'
    };
    const state = {
      ...defaultState,
      selectedDataType: 'type'
    };
    expect(reducer(undefined, action)).toEqual(state);
  });
});
