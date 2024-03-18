function getRandomNumber() {
  const random = Math.floor(Math.random() * 1000) + 1;
  console.log(random);
  return random;
}

getRandomNumber();

module.exports = getRandomNumber;