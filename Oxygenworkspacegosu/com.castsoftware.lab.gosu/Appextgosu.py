import cast_upgrade_1_6_5 # @UnusedImport
from cast.analysers import log as Print
import cast.application


class gosuExtensionApplication(cast.application.ApplicationLevelExtension):

    def __init__(self):   
        pass     
    
       
        
        
    def end_application(self, application):
        Print.info("gosu : Running extension code at the end of an application")
        print.debug(str(application))
        pass
    