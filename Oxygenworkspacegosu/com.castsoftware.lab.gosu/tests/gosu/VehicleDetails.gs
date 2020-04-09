package figs.integration.vin

interface VehicleDetails {

  public static final var VIN : String = "vin"
  public static final var VEH_CODE : String = "vehCode"
  public static final var EXT_VEH_CODE : String = "extndVehCode"
  public static final var MAKE : String = "make"
  public static final var MODEL_YEAR : String = "modelYear"
  public static final var MODEL : String = "model"
  public static final var MSRP_GROUPS : String = "msrpRateGroups"
  public static final var COLL_DCPD_COMB : String = "collDcpdComb"
  public static final var ACC_BENIFITS : String = "accBenifits"
  public static final var DCPD : String = "dcpd"
  public static final var COLLISION : String = "collision"
  public static final var COMPREHENSIVE : String = "comprehensive"
  public static final var COLL_COMP_DCPD_COMB : String = "collCompDcpdComb"
  public static final var VEH_TYPE : String = "vehType"
  public static final var BODY_STYLE : String = "bodyStyle"
  public static final var CONVERTIBLE_IND : String = "convertibleInd"
  public static final var DRIVE_TRAIN : String = "driveTrain"
  public static final var CSIO_BODY_TYPE : String = "csioBodyType"
  public static final var ENGINE_CYLINDER : String = "engCylinder"
  public static final var ENGINE_CYLINDER_AT_SM : String = "engineCylinder"
  public static final var ENGINE_FUEL : String = "engineFuel"
  public static final var SPECIFIED_PERIL : String = "specifiedPerils"
  public static final var CURRENT_CLASS : String = "currentClasses"
  public static enum vehicleType {PP, MC, SM, AT }
}