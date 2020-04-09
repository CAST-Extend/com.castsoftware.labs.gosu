package figs.util.common

interface APIConfigurationConstants {

  public static final var VIN_SEARCH : String = "http://35.183.80.165:9080/vin/fetchVehicleDetailsByVIN/"
  public static final var VEH_MAKE_SEARCH_URL : String = "http://35.183.80.165:9080/vin/fetchMakeByVehicleType/"
  public static final var VEH_MODEL_SEARCH_URL : String = "http://35.183.80.165:9080/vin/fetchModelByVTMake/"
  public static final var VEH_RATE_INFO_SEARCH_URL : String = "http://35.183.80.165:9080/vin/fetchRatingDetailsByVehType/"
  public static final var VEH_RATE_INFO_URL_PP : String = "http://35.183.80.165:9080/vin/fetchPPVRatingDetailsByVehType/"
  public static final var VEH_RATE_INFO_URL_MC : String = "http://35.183.80.165:9080/vin/fetchMotorRatingDetailsByVehType/"
}