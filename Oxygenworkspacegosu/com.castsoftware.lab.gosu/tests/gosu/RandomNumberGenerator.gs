package figs.util.common


/**
 * This function willl generate a random single digit number
 */
class RandomNumberGenerator {

  static function generateRandomNumber() : Integer {
    var objGenerator = new Random()
    var randomNumber = objGenerator.nextInt(9)
    return randomNumber
  }
}