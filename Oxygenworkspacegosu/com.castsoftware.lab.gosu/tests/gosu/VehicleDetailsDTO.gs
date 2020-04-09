package figs.integration.vin.dto

/**
 * Class written to map json response for Vin Search 
 */
class VehicleDetailsDTO {

  var _vin: String as vin
  var _dupIndVehCode: Integer as dupIndVehCode
  var _vehCode: String as vehCode
  var _dupIndExtVehCode: Integer as dupIndExtVehCode
  var _extndVehCode: String as extndVehCode
  var _modelYear: Integer as modelYear
  var _make: String as make
  var _model: String as model
  var _makeModelAbbr: String as makeModelAbbr
  var _vehType: String as vehType
  var _classes: String as classes
  var _driveTrainFinalDrive: String as driveTrainFinalDrive
  var _CSIOBodyType: String as CSIOBodyType
  var _EngineCylinder: Integer as EngineCylinder
  var _EngineFuel: String as EngineFuel
  //PP and MC vehicle Model
  var _dupIndVeCode:  Integer as dupIndVeCode;
  var _msrpRateGroups:  String as msrpRateGroups;
  var _collDcpdComb:  String as collDcpdComb;
  var _collCompDcpdComb:  String as collCompDcpdComb;
  var _bodyStyle:  String as bodyStyle;
  var _convertibleInd:  Integer as convertibleInd;
  var _driveTrain:  String as driveTrain;
  var _finalDrive:  String as finalDrive;

  //PP & MC vehicle RATING Model
  var _accBenifits:  String as accBenifits;
  var _dcpd:  String as dcpd;
  var _collision:  String as collision;
  var _comprehensive:  String as comprehensive;
  var _specifiedPerils:  String as specifiedPerils;
  var _currentClasses:  String as currentClasses;

}