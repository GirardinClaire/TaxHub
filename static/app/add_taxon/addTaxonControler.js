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
        };


        //--------------------- Fonctions ------------------------------------

        // Watchers pour lb_nom et lb_auteur
        $scope.$watchGroup(['ctrl.newTaxon.lb_nom', 'ctrl.newTaxon.lb_auteur'], function(newValues) {
            var lb_nom = newValues[0] || '';
            var lb_auteur = newValues[1] || '';
            ctrl.newTaxon.nom_complet = lb_nom + ' ' + lb_auteur;
        });


        // Gestion des droits
        // self.userRights = loginSrv.getCurrentUserRights();

        // Exemple de fonction pour ajouter un taxon
        self.addTaxon = function(taxonData) {
            // // Ici, tu feras une requête HTTP POST pour ajouter le taxon à ta base de données
            // // Exemple simplifié :
            // $http.post(backendCfg.api_url + 'taxons/add', taxonData)
            // .then(function(response) {
            //     // Gérer la réponse après ajout
            //     console.log('Taxon ajouté avec succès');
            //     // Redirection ou autres actions après l'ajout
            // }, function(error) {
            //     // Gérer les erreurs
            //     console.error('Erreur lors de l\'ajout du taxon', error);
            // });
            console.log('Taxon ajouté avec succès');
        };

        // Autres fonctions nécessaires pour la gestion de cette page

}]);
