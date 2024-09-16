app.service('TaxonService', ['$http', 'backendCfg', function($http, backendCfg) {

    this.getIdNomStatuts = function() {
        return $http.get(backendCfg.api_url+'taxref/idNomStatuts').then(response => response.data);
    };

    this.getIdNomHabitats = function() {
        return $http.get(backendCfg.api_url+'taxref/idNomHabitats').then(response => response.data);
    };

    this.getIdNomRangs = function() {
        return $http.get(backendCfg.api_url+'taxref/idNomRangs').then(response => response.data);
    };

    this.getGroup1Inpn = function() {
        return $http.get(backendCfg.api_url+'taxref/groupe1_inpn').then(response => response.data);
    };

    this.getGroup2Inpn = function() {
        return $http.get(backendCfg.api_url+'taxref/groupe2_inpn').then(response => response.data);
    };

    this.addTaxon = function(newTaxon) {
        return $http.post(backendCfg.api_url+'taxref/addTaxon', newTaxon).then(response => response.data);
    };

    this.deleteTaxon = function() {
        return $http.post(backendCfg.api_url+'taxref/deleteTaxon').then(response => response.data);
    };

}]);

