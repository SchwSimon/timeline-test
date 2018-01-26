import positionToTime from '../../utils/positionToTime';

describe('function positionToTime()', () => {
  const position = 366;

  describe('default args', () => {
    it('must equal object', () => {
      expect(positionToTime(position)).toEqual({
        hours: 6,
        minutes: 6
      });
    });
  });

  describe('hourLength given', () => {
    it('must equal object', () => {
      expect(positionToTime(position, 500)).toEqual({
        hours: 0,
        minutes: 44
      });
    });
  });

  describe('offset given', () => {
    it('must equal object', () => {
      expect(positionToTime(position, undefined, 50)).toEqual({
        hours: 5,
        minutes: 16
      });
    });
  });
});
