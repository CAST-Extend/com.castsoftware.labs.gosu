package figs.util.logging

uses gw.pl.logging.LoggerCategory
uses org.slf4j.Logger


/**
 * The following abstract base "Logger Category" class is intended to be extended for all Portage logging purposes.
 * <p>
 * It is recommended to create one new 'named logger' per subject area - for instance, one named logger per integration.
 * The following explains how to implement a new logger:
 * <p>
 * 1. If a new named logger is needed, create a custom logger class which extends FIGSLoggerBase. As an example, here is
 *    the custom logger class created for the ACS Integration:
 *    <pre>{@code
 *      class ACSLogger extends FIGSLoggerBase {
 *        public static final var LOGGER : Logger = (new ACSLogger())._logger
 *        private construct() {
 *          super("ACSLogger")  // This logger name string matches the logger category configured in log4j2.xml
 *        }
 *      }
 *    }</pre>
 * <p>
 * 2. At the bottom of the "config/logging/log4j2.xml" file, append a new Logger definition for the new logger.
 *    For example, the Logger entry for ACS is:
 *    <pre>{@code
 *      <Logger name="ACSLogger" additivity="false" level="debug">
 *        <AppenderRef ref="ACSLog"/>
 *      </Logger>
 *    }</pre>
 *  <p>
 *  3. Further up in the "config/logging/log4j2.xml" file, also add an 'appender' entry. This is the appender referenced
 *     in the logger entry created in step 2. For example, the Appender entry for ACS is:
 *     <pre>{@code
 *       <RollingFile name="ACSLog" fileName="${guidewire.logDirectory}/acs.log"
 *            filePattern="${guidewire.logDirectory}/acs.log%d{.yyyy-MM-dd}">
 *         <PatternLayout pattern="${file.defaultPattern}" charset="UTF-8"/>
 *         <TimeBasedTriggeringPolicy/>
 *       </RollingFile>
 *     }</pre>
 * <p>
 * 4. In each class where you want to use the named logger, declare a static reference to its instance. For example,
 *    the reference class variable for the ACS Integration logger is:
 *    <pre>{@code
 *      private static var _logger = ACSLogger.LOGGER
 *    }</pre>
 * <p>
 * 5. NOTE: a FIGSLoggerBasEnhancement exists which provides functions for trace logging of function begin and end
 *         [i.e. _logger.traceBegin() and _logger.traceEnd()]
 */
public abstract class FIGSLoggerBase extends LoggerCategory {
  protected var logger : Logger = null

  protected construct(loggerInstanceName : String) {
    this.logger = createLogger(loggerInstanceName)
  }
}