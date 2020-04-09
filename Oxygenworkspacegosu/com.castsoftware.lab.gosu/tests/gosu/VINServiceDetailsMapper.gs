package figs.integration.vin.mappers

uses com.fasterxml.jackson.core.type.TypeReference
uses com.fasterxml.jackson.databind.ObjectMapper
uses figs.integration.vin.VehicleDetails
uses figs.integration.vin.dto.VehicleDetailsDTO
uses figs.util.common.RandomNumberGenerator
uses gw.api.system.PCLoggerCategory

class VINServiceDetailsMapper implements VehicleDetails {

  private static var EMPTY_STRING : String = ""

  /**
   * This function will map the VIN services reponse details to Vehicle entity
   *
   * @param jsonRespString
   * @param vehicle
   * @param vehType
   * @return
   */
  static function mapVINReponseDetails(jsonRespString: String, vehicle: PersonalVehicle): PersonalVehicle {
    var mapper = new ObjectMapper()
    var responseObject: List<VehicleDetailsDTO> = mapper.readValue(jsonRespString, new TypeReference<List<VehicleDetailsDTO>>() {
    })
    var firstResult = responseObject.first()
    if (responseObject.Count == 1) {
      PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapVINReponseDetails():: started...")
      vehicle.vicc = firstResult.vehCode
      vehicle.Year = firstResult.modelYear
      vehicle.ExtendedVehicleCode_Ext = vehicle.Vin.substring(11, 17)
      vehicle.Make = firstResult.make
      vehicle.Model = firstResult.model
      vehicle.RateGroupCollDCPD_PP_Ext = firstResult.collDcpdComb
      vehicle.RateGroupAccBenefit_Ext = firstResult.accBenifits
      vehicle.RateGroupDCPD_Ext = firstResult.dcpd
      vehicle.RateGroupColl_Ext = firstResult.collision
      vehicle.RateGroupComp_Ext = firstResult.comprehensive
      vehicle.RateGroupCollCompDCPD_PP_Ext = firstResult.collCompDcpdComb
      vehicle.Ratespecifiedperil_MC_Ext = firstResult.specifiedPerils
      if (firstResult.CSIOBodyType != null) {
        vehicle.BodyType = BodyType.get(firstResult.CSIOBodyType.trim())
      }
      vehicle.EngineCylinder_Ext = firstResult.EngineCylinder?.toString()
      vehicle.EngineFuel_Ext = firstResult.EngineFuel
      if (firstResult.EngineFuel != null) {
        vehicle.fueltypelink = FuelType.get(firstResult.EngineFuel.trim())
      }
      //The below fileds will store in GW
      vehicle.RateGroupMSRP_Ext = firstResult.msrpRateGroups
      vehicle.VehicleType_Ext = firstResult.vehType
      vehicle.BodyStyle_Ext = firstResult.bodyStyle
      vehicle.Convertible_Ext = firstResult.convertibleInd
      vehicle.DriveTrain_Ext = firstResult.driveTrain
      if (firstResult.currentClasses != null) {
        vehicle.CurrentClass_Ext = CurrentClass.getTypeKey(firstResult.currentClasses.trim())
      }
      PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapVINReponseDetails:: completed...")
    } else if (responseObject.Count > 1) {
      //vehicle.vicc = firstResult.vehCode
      vehicle.Year = firstResult.modelYear
      vehicle.ExtendedVehicleCode_Ext = vehicle.Vin.substring(11, 17)
      vehicle.Make = firstResult.make
    }
    return vehicle
  }

  /**
   * This method will map the webservices (RATING INFO)reponse- JSON string values to vehicle entity for Vehicle type PP
   *
   * @param jsonObject
   * @param vehicle
   * @return
   */
  static function mapRatingDetails_PP(jsonObject: javax.script.Bindings, vehicle: PersonalVehicle): PersonalVehicle {
    PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapRatingDetails_PP():: started...")
    vehicle.Vin = jsonObject.get(VehicleDetails.VIN)?.toString()
    vehicle.vicc = jsonObject.get(VehicleDetails.VEH_CODE)?.toString()
    vehicle.ExtendedVehicleCode_Ext = jsonObject.get(EXT_VEH_CODE)?.toString()
    if (jsonObject.get(VehicleDetails.VIN) != null && vehicle.ExtendedVehicleCode_Ext != null) {
      vehicle.Vin = gerenerate17DigitVIN(jsonObject.get(VehicleDetails.VIN)?.toString(), vehicle.ExtendedVehicleCode_Ext)
    }
    if (jsonObject.get(VehicleDetails.CSIO_BODY_TYPE) != null) {
      vehicle.BodyType = BodyType.get(jsonObject.get(VehicleDetails.CSIO_BODY_TYPE)?.toString().trim())
    }
    vehicle.EngineCylinder_Ext = jsonObject.get(VehicleDetails.ENGINE_CYLINDER) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.ENGINE_CYLINDER)?.toString()
    if (jsonObject.get(VehicleDetails.ENGINE_FUEL) != null) {
      vehicle.fueltypelink = FuelType.get(jsonObject.get(VehicleDetails.ENGINE_FUEL)?.toString().trim())
    }
    vehicle.RateGroupCollDCPD_PP_Ext = jsonObject.get(VehicleDetails.COLL_DCPD_COMB) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COLL_DCPD_COMB)?.toString()
    vehicle.RateGroupAccBenefit_Ext = jsonObject.get(VehicleDetails.ACC_BENIFITS) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.ACC_BENIFITS)?.toString()
    vehicle.RateGroupDCPD_Ext = jsonObject.get(VehicleDetails.DCPD) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.DCPD)?.toString()
    vehicle.RateGroupColl_Ext = jsonObject.get(VehicleDetails.COLLISION) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COLLISION)?.toString()
    vehicle.RateGroupComp_Ext = jsonObject.get(VehicleDetails.COMPREHENSIVE) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COMPREHENSIVE)?.toString()
    vehicle.RateGroupCollCompDCPD_PP_Ext = jsonObject.get(VehicleDetails.COLL_COMP_DCPD_COMB) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COLL_COMP_DCPD_COMB)?.toString()
    PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapRatingDetails_PP:: completed...")
    return vehicle
  }

  /**
   * This method will map the webservices (RATING INFO)reponse- JSON string values to vehicle entity for Vehicle type MC
   *
   * @param jsonObject
   * @param vehicle
   * @return
   */
  static function mapRatingDetails_MC(jsonObject: javax.script.Bindings, vehicle: PersonalVehicle): PersonalVehicle {
    PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapRatingDetails_MC():: started...")
    vehicle.Vin = jsonObject.get(VehicleDetails.VIN)?.toString()
    vehicle.vicc = jsonObject.get(VehicleDetails.VEH_CODE)?.toString()
    vehicle.ExtendedVehicleCode_Ext = jsonObject.get(EXT_VEH_CODE)?.toString()
    if (jsonObject.get(VehicleDetails.VIN) != null && vehicle.ExtendedVehicleCode_Ext != null) {
      vehicle.Vin = gerenerate17DigitVIN(jsonObject.get(VehicleDetails.VIN)?.toString(), vehicle.ExtendedVehicleCode_Ext)
    }
    if (jsonObject.get(VehicleDetails.CSIO_BODY_TYPE) != null) {
      vehicle.BodyType = BodyType.get(jsonObject.get(VehicleDetails.CSIO_BODY_TYPE)?.toString().trim())
    }
    vehicle.EngineCylinder_Ext = jsonObject.get(VehicleDetails.ENGINE_CYLINDER) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.ENGINE_CYLINDER)?.toString()
    if (jsonObject.get(VehicleDetails.ENGINE_FUEL) != null) {
      vehicle.fueltypelink = FuelType.get(jsonObject.get(VehicleDetails.ENGINE_FUEL)?.toString().trim())
    }
    if (jsonObject.get(VehicleDetails.CURRENT_CLASS) != null) {
      vehicle.CurrentClass_Ext = typekey.CurrentClass.getTypeKey(jsonObject.get(VehicleDetails.CURRENT_CLASS)?.toString().trim())
    }
    vehicle.RateGroupAccBenefit_Ext = jsonObject.get(VehicleDetails.ACC_BENIFITS) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.ACC_BENIFITS)?.toString()
    vehicle.RateGroupDCPD_Ext = jsonObject.get(VehicleDetails.DCPD) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.DCPD)?.toString()
    vehicle.RateGroupColl_Ext = jsonObject.get(VehicleDetails.COLLISION) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COLLISION)?.toString()
    vehicle.RateGroupComp_Ext = jsonObject.get(VehicleDetails.COMPREHENSIVE) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COMPREHENSIVE)?.toString()
    vehicle.RateGroupComp_Ext = jsonObject.get(VehicleDetails.COMPREHENSIVE) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.COMPREHENSIVE)?.toString()
    vehicle.Ratespecifiedperil_MC_Ext = jsonObject.get(VehicleDetails.SPECIFIED_PERIL) == null ? EMPTY_STRING : jsonObject.get(VehicleDetails.SPECIFIED_PERIL)?.toString()
    PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapRatingDetails_MC:: completed...")
    return vehicle
  }


  /**
   * This function will map the VIN services reponse details to Vehicle entity
   *
   * @param jsonRespString
   * @param vehicle
   * @param vehType
   * @return
   */
  static function mapRatingDetailsForVIN(jsonRespString: String, vehicle: PersonalVehicle): PersonalVehicle {
    var mapper = new ObjectMapper()
    var responseObject: VehicleDetailsDTO = mapper.readValue(jsonRespString, new TypeReference<VehicleDetailsDTO>() {
    })
    if (responseObject != null) {
      PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapVINReponseDetails():: started...")
      vehicle.vicc = responseObject.vehCode
      vehicle.RateGroupCollDCPD_PP_Ext = responseObject.collDcpdComb
      vehicle.RateGroupAccBenefit_Ext = responseObject.accBenifits
      vehicle.RateGroupDCPD_Ext = responseObject.dcpd
      vehicle.RateGroupColl_Ext = responseObject.collision
      vehicle.RateGroupComp_Ext = responseObject.comprehensive
      vehicle.RateGroupCollCompDCPD_PP_Ext = responseObject.collCompDcpdComb
      vehicle.Ratespecifiedperil_MC_Ext = responseObject.specifiedPerils
      if (responseObject.CSIOBodyType != null) {
        vehicle.BodyType = BodyType.get(responseObject.CSIOBodyType.trim())
      }
      vehicle.EngineCylinder_Ext = responseObject.EngineCylinder?.toString()
      vehicle.EngineFuel_Ext = responseObject.EngineFuel
      if (responseObject.EngineFuel != null) {
        vehicle.fueltypelink = FuelType.get(responseObject.EngineFuel.trim())
      }
      //The below fileds will store in GW
      if (responseObject.currentClasses != null) {
        vehicle.CurrentClass_Ext = CurrentClass.getTypeKey(responseObject.currentClasses.trim())
      }
      PCLoggerCategory.APPLICATION.debug("VINServiceDetailsMapper..::..mapVINReponseDetails:: completed...")
    }
    return vehicle
  }


  /**
   * This function will return 17 digit VIN number based upon External DB values
   *
   * @param vin
   * @param extndVehCode
   * @return
   */
  static function gerenerate17DigitVIN(vin: String, extndVehCode: String): String {
    return vin.substring(0, 8) + RandomNumberGenerator.generateRandomNumber() + vin.substring(8, 10) + extndVehCode
  }

}