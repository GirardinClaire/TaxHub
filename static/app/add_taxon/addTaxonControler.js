app.controller('addTaxonCtrl', ['$scope', 'TaxonService', function($scope, TaxonService) {

        //--------------------- Valeurs par défaut ------------------------------------
        var ctrl = this;
        ctrl.route='addTaxon';

        // Initialisation de newTaxon
        ctrl.newTaxon = { // Initialisation de newTaxon
            lb_nom: '',
            lb_auteur: '',
            nom_complet: '',
            nom_valide: '',
            nom_vern: '',
            nom_vern_eng: '',
            url: '',

            statut: 'Non précisé',
            habitat: 'Non renseigné',
            rang: '',
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

        // Charger les données au démarrage
        TaxonService.getIdNomStatuts().then(data => ctrl.statuts = data);
        TaxonService.getIdNomHabitats().then(data => ctrl.habitats = data);
        TaxonService.getIdNomRangs().then(data => ctrl.rangs = data);
        TaxonService.getGroup1Inpn().then(data => ctrl.group1Inpn = data);
        TaxonService.getGroup2Inpn().then(data => ctrl.group2Inpn = data);
        TaxonService.getGroup3Inpn().then(data => ctrl.group3Inpn = data);


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
            // Convertir les noms des statuts, habitats et rangs en IDs avant l'envoi
            var statut = ctrl.statuts.find(s => s.nom_statut === newTaxon.statut);
            var habitat = ctrl.habitats.find(h => h.nom_habitat === newTaxon.habitat);
            var rang = ctrl.rangs.find(r => r.nom_rang === newTaxon.rang);

            if (statut) newTaxon.id_statut = statut.id_statut;
            if (habitat) newTaxon.id_habitat = habitat.id_habitat;
            if (rang) newTaxon.id_rang = rang.id_rang;

            // Nettoyage des propriétés inutilisées
            delete newTaxon.statut;
            delete newTaxon.habitat;
            delete newTaxon.rang;

            // Envoi A GERER
            console.log('Taxon ajouté avec succès !');
            console.log(newTaxon);
 
        };

}])

