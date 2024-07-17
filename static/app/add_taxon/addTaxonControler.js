app.controller('addTaxonCtrl', ['$scope', '$http', 'backendCfg',
    function($scope, $http, backendCfg) {

        //--------------------- Valeurs par défaut ------------------------------------
        var self = this;
        self.route='addTaxon';
        
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
