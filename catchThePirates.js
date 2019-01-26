module.exports.catchThePirates = pirateFaces => {
  var eyes = [";", "8"]; // must
  var nose = ["-", "~"]; // not have
  var mouth = [")", "|"]; // must
  var count = 0;
  // loop inside pirateFaces
  for (let i = 0; i < pirateFaces.length; i++) {
    // split currFace to arr to divide all face parts
    var currFace = pirateFaces[i].split("");
    // store size to check if the face have nose or not
    var size = currFace.length;
    // check size if does not have nose
    if (size === 2) {
      // check if valid face
      if (eyes.includes(currFace[0]) && mouth.includes(currFace[1])) {
        count++;
      }
      // check size if have nose
    } else if (size === 3) {
      if (
        // check if valid face
        eyes.includes(currFace[0]) &&
        nose.includes(currFace[1]) &&
        mouth.includes(currFace[2])
      ) {
        count++;
      }
    }
  }
  // valid face count
  return count;
};
