module.exports.catchThePirates = pirateFaces => {
  var eyes = [";", "8"]; // must
  var nose = ["-", "~"]; // not have
  var mouth = [")", "|"]; // must
  var count = 0;
  for (let i = 0; i < pirateFaces.length; i++) {
    var currFace = pirateFaces[i].split("");
    var size = currFace.length;
    if (size === 2) {
      if (eyes.includes(currFace[0]) && mouth.includes(currFace[1])) {
        count++;
      }
    } else if (size === 3) {
      if (
        eyes.includes(currFace[0]) &&
        nose.includes(currFace[1]) &&
        mouth.includes(currFace[2])
      ) {
        count++;
      }
    }
  }
  return count;
};
