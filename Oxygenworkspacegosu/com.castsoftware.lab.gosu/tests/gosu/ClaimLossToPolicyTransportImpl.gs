package test.samplecode

uses gw.pl.logging.LoggerCategory
uses gw.plugin.messaging.MessageTransport
uses java.sql.Connection

/**
 * To send claim loss details to Policy system
 */
class ClaimLossToPolicyTransportImpl implements MessageTransport {

  private var _destinationId : int
  private static var _logger : LoggerCategory

  override function send(message : Message, transformedPayload : String) {
    var myClaimLossToLegacyTransportBuilder = new ClaimLossToLegacyPolicyTransportBuilder()

    // Get the payload
    var outClaimLossDetails = message.Payload
    if (outClaimLossDetails == null) {
      message.reportError()  // Don't suspend the queue
      return  // Don't clear the message from the queue
    }
    // Try to get a connection to database
    var con : Connection
    try {
      con = myClaimLossToLegacyTransportBuilder.getDBConnection()
      // Insert transaction to  database.
      myClaimLossToLegacyTransportBuilder.insertOrUpdateClaimLossSummary(con, outClaimLossDetails)
      // Clear message from queue
      message.reportAck()
    } catch (e : Exception) {
      var msg = "Exception in Claim Loss To Policy Transport: " + e.Message
      _logger.error(msg)
      message.reportError()  // Don't suspend the queue or clear the message from queue.
    } finally {
      con?.close()  // Always close the connection
    }
  }

  /**
   * Shutdown the transport
   */
  override function shutdown() {

  }

  /**
   * Suspend the transport
   */
  override function suspend() {
    print("Queue is suspended")

  }

  /**
   * Resume transport
   */
  override function resume() {

  }

  /**
   * Set messaging destination ID
   */
  override property set DestinationID(destinationID : int) {
    _destinationId = destinationID
  }

}