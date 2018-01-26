import forceTwoDigitString from '../../utils/forceTwoDigitString';

describe('function forceTwoDigitString()', () => {
  it('must add a leading zero', () => {
    expect(forceTwoDigitString(2)).toBe('02');
    expect(forceTwoDigitString('2')).toBe('02');
  });

  it('must cut to 2 digits', () => {
    expect(forceTwoDigitString(123)).toBe('23');
    expect(forceTwoDigitString('002')).toBe('02');
  });

  it('must cast to string', () => {
    expect(forceTwoDigitString(20)).toBe('20');
  });

  it('must return default', () => {
    expect(forceTwoDigitString('30')).toBe('30');
  });
});
