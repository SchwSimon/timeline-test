  // prepends a leading zero on numbers smaller than 10
export default (num) => {
  num = num + '';  // cats to string
  switch(num.length) {
    case 1:
      return '0' + num;
    case 2:
      return num;
    default:
      return num.substr(-2);
  }
}
