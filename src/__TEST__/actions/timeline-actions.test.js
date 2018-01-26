import sinon from 'sinon';
import * as types from '../../actions/action-types';
import * as actions from '../../actions/timeline-actions';
import * as TIMELINE_DATA_TMP from '../../__MOCKS__/timeline.json';

describe('Actions', () => {
   it('requestTimeline', () => {
     expect(actions.requestTimeline()).toEqual({
       type: types.REQUEST_TIMELINE
     });
   });

   it('receiveTimeline', () => {
     const payload = 'timeline';
     expect(actions.receiveTimeline(payload)).toEqual({
       type: types.RECEIVE_TIMELINE,
       payload: payload
     });
   });

   describe('fetchTimeline', () => {
     const fetchTimeline = actions.fetchTimeline();
     const dispatchSpy = sinon.spy();

     fetchTimeline(dispatchSpy);

     it('must be a function', () => {
       expect(typeof fetchTimeline).toBe('function');
     });

     it('must dispatch requestTimeline() with the correct result', () => {
       expect(dispatchSpy.calledWith(actions.requestTimeline())).toBeTruthy();
     });

     it('must dispatch receiveTimeline() with the correct result', () => {
       expect(dispatchSpy.calledWith(actions.receiveTimeline(TIMELINE_DATA_TMP))).toBeTruthy();
     });
   });
});
