package figs.util.exception

public class FIGSException extends Exception {
  private var _errorCode : String as readonly ErrorCode  // for debugging purposes
  private var _errorCategory : String as readonly ErrorCategory
  private var _logMessage : String as readonly LogMessage
  private var _displayMessage : String as readonly DisplayMessage
  private var _cause : Throwable as readonly Cause

  protected construct(errorCode : String, errorCategory : String, logMessage : String, displayMessage : String, cause : Throwable) {
    super(displayMessage, cause) // null 'cause' permitted by java.lang.Exception API

    _errorCode = errorCode
    _errorCategory = errorCategory
    _logMessage = logMessage
    _displayMessage = displayMessage
    _cause = cause
  }
}