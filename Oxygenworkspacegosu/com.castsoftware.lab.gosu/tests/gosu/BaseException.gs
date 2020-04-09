package figs.util.exception

uses org.slf4j.LoggerFactory

uses java.io.PrintStream
uses java.io.PrintWriter
uses java.io.StringWriter

/**
 * Preserves debugging information by chaining. It provides constructors that take an exception as one
 * of the arguments, and it overrides the printStackTrace() method to print both stack traces. Concrete exception
 * classes need to extend this class and provide desired constructors.
 *
 */
public class BaseException extends Exception {


  private static final var serialVersionUID = 3377472573454834080L
  private static var logger = LoggerFactory.getLogger("BaseException")
  private var cause : Throwable = null

  public construct() {
    super()
  }

  public construct(reason : String) {
    super(reason)
    if (logger.isErrorEnabled()) {
      logger.error("BaseException  " + reason);
      logStackTrace()
    }
  }

  /**
   * Logs the exception stack trace
   *
   */
  private function logStackTrace() : void {
    var sw = new StringWriter();
    printStackTrace(new PrintWriter(sw));
    logger.error(sw.toString());
  }
}
