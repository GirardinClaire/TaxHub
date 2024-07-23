app.controller('addTaxonCtrl', ['$scope', '$http', 'backendCfg',
    function($scope, $http, backendCfg) {

        //--------------------- Valeurs par défaut ------------------------------------
        var ctrl = this;
        ctrl.route='addTaxon';
        ctrl.newTaxon = { // Initialisation de newTaxon
            lb_nom: '',
            lb_auteur: '',
            nom_complet: '',
            nom_valide: '',
            nom_vern: '',
            nom_vern_eng: '',
            url: '',

            id_statut: '', // par défaut le statut est "Non précisé"
            id_habitat: 0, // par défaut l'habitat est "Non renseingé"
            id_rang: '',
            group1_inpn: null,
            group2_inpn: null,
            group3_inpn: null,

            regne: '',
            phylum: '',
            classe: '',
            ordre: '',
            famille: '',
            sous_famille: '',
            tribu: ''
        };


        //--------------------- Fonctions ------------------------------------

        // Watchers pour lb_nom et lb_auteur
        $scope.$watchGroup(['ctrl.newTaxon.lb_nom', 'ctrl.newTaxon.lb_auteur'], function(newValues) {
            var lb_nom = newValues[0] || '';
            var lb_auteur = newValues[1] || '';
            ctrl.newTaxon.nom_complet = lb_nom + ' ' + lb_auteur;
        });


        // Gestion des droits
        // ctrl.userRights = loginSrv.getCurrentUserRights();


        ctrl.addTaxon = function(newTaxon) {
            console.log('Taxon ajouté avec succès !');
        };



}]);
