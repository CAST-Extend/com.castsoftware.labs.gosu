package figs.util.logging

uses org.slf4j.Logger

/**
 *  Logger used for the Policy Search Integration
 */
class VINSearchIntegrationLogger extends FIGSLoggerBase {
  public static final var LOGGER : Logger  = (new VINSearchIntegrationLogger()).logger

  private construct() {
    super("VINSearchIntegrationLogger") // logger name 'string' must match the logger category configured in log4j2.xml
  }
}