package figs.integration.vin.webservice.client

uses figs.util.common.APIConfigurationConstants
uses gw.api.system.PCLoggerCategory
uses org.apache.http.client.methods.HttpGet
uses org.apache.http.impl.client.HttpClients
uses org.apache.http.util.EntityUtils

class VINServiceAPIClient {

  private static final var PathDelimitor : String = "/"

  /**
   * This method will build a request url and call the makes VIN webservices call
   *
   * @param vin
   * @return
   */

  function invokeVINServiceRequest(vin: String, vehType: String): String {
    return getVinDetails(APIConfigurationConstants.VIN_SEARCH + vehType + PathDelimitor +  vin)
  }

  function invokeMakeSearchRequest(veh_Type: String, year: String): String {
    return getVinDetails(APIConfigurationConstants.VEH_MAKE_SEARCH_URL + veh_Type + PathDelimitor + year)
  }

  function invokeModelSearchRequest(veh_Type: String, year: String, make: String): String {
    return getVinDetails(APIConfigurationConstants.VEH_MODEL_SEARCH_URL + veh_Type + PathDelimitor + year
        + PathDelimitor + formatParam(make))
  }

  function invokeRateInfoRequestForPP(veh_Type: String, year: String, make: String, model: String): String {
    return getVinDetails(APIConfigurationConstants.VEH_RATE_INFO_URL_PP + veh_Type + PathDelimitor + formatParam(make)
        + PathDelimitor + year + PathDelimitor + formatParam(model))
  }

  function invokeRateInfoRequestForMC(veh_Type: String, year: String, make: String, model: String) : String {
    return getVinDetails(APIConfigurationConstants.VEH_RATE_INFO_URL_MC + veh_Type + PathDelimitor + formatParam(make)
        + PathDelimitor + year + PathDelimitor + formatParam(model))
  }

  function invokeRateInfoRequestForSMorAT(veh_Type: String, vin: String, year: String, make: String, model: String) : String {
    return getVinDetails(APIConfigurationConstants.VEH_RATE_INFO_SEARCH_URL + veh_Type + PathDelimitor + vin + PathDelimitor + year
        + PathDelimitor + formatParam(make) + PathDelimitor + formatParam(model))
  }

  /**
   * Function created to replace all special characters found in path params with hexadecimal values
   *
   * @param param
   * @return
   */
  private function formatParam(param: String): String {
    return param.replaceAll(" ", "%20")

  }

  /**
   * This method will take the request url as input parameter and fetch all the VIN related details from exteranl DB
   *
   * @param reqURL
   * @return
   */
  function getVinDetails(reqURL: String): String {
    var httpClient = HttpClients.createDefault()
    var respResult: String
    try {
      PCLoggerCategory.APPLICATION.debug("VINServiceAPIClient...::...getVinDetails() :: Invoking webservices for getVinDetails() with url: " + reqURL)
      var request = new HttpGet(reqURL)
      var response = httpClient.execute(request)
      try {
        PCLoggerCategory.APPLICATION.debug("VINServiceAPIClient...:: getVinDetails() :: processing webservices response with url: " + reqURL)
        var entity = response.getEntity()
        if (entity != null) {
          respResult = EntityUtils.toString(entity)
        }
      } catch (e: Exception) {
        PCLoggerCategory.APPLICATION.error("VINServiceAPIClient...:: getVinDetails() :: exception occurred while processing webservices response with url: " + reqURL)
        PCLoggerCategory.APPLICATION.error(e.Message)
        throw e //TODO
      } finally {
        response.close()
        httpClient.close()
      }
    } catch (e: Exception) {
      PCLoggerCategory.APPLICATION.error("VINServiceAPIClient...:: getVinDetails() :: exception occurred while invoking webservices with url: " + reqURL)
      PCLoggerCategory.APPLICATION.error(e.Message)
      throw e //TODO

    } finally {
      httpClient.close()
    }
    PCLoggerCategory.APPLICATION.debug("VINServiceAPIClient...:: excuting getVinDetails() completed for url: " + reqURL)
    return respResult
  }
}