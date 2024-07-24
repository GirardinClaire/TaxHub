app.controller('addTaxonCtrl', ['$scope', 'TaxonService', function($scope, TaxonService) {

    //--------------------- Valeurs par défaut ------------------------------------
    var ctrl = this;
    ctrl.route = 'addTaxon';

    // Charger les données au démarrage avec Promise.all
    Promise.all([
        TaxonService.getIdNomStatuts(),
        TaxonService.getIdNomHabitats(),
        TaxonService.getIdNomRangs(),
        TaxonService.getGroup1Inpn(),
        TaxonService.getGroup2Inpn(),
        TaxonService.getGroup3Inpn()
    ]).then(([statuts, habitats, rangs, group1Inpn, group2Inpn, group3Inpn]) => {
        ctrl.statuts = statuts;
        ctrl.habitats = habitats;
        ctrl.rangs = rangs;
        ctrl.group1Inpn = group1Inpn;
        ctrl.group2Inpn = group2Inpn;
        ctrl.group3Inpn = group3Inpn;

        // Initialisation de newTaxon avec les valeurs par défaut
        ctrl.newTaxon = {
            lb_nom: '',
            lb_auteur: '',
            nom_complet: '',
            nom_valide: '',
            nom_vern: '',
            nom_vern_eng: '',
            url: '',

            statut: ctrl.statuts.find(s => s.nom_statut === 'Non précisé'),
            id_statut: ctrl.statuts.find(s => s.nom_statut === 'Non précisé').id_statut,

            habitat: ctrl.habitats.find(h => h.nom_habitat === 'Non renseigné'),
            id_habitat: ctrl.habitats.find(h => h.nom_habitat === 'Non renseigné').id_habitat,

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

        // Appliquer les changements dans $scope
        $scope.$apply();
    }).catch(error => {
        console.error("Erreur lors du chargement des données:", error);
    });


    //--------------------- Fonctions ------------------------------------

    // Watchers pour lb_nom et lb_auteur afin de remplir nom_complet automatiquement
    $scope.$watchGroup(['ctrl.newTaxon.lb_nom', 'ctrl.newTaxon.lb_auteur'], function(newValues) {
        var lb_nom = newValues[0] || '';
        var lb_auteur = newValues[1] || '';
        if (ctrl.newTaxon) {
            ctrl.newTaxon.nom_complet = lb_nom + ' ' + lb_auteur;
        }
    });

// Gestion des droits
// ctrl.userRights = loginSrv.getCurrentUserRights();



    // Ajouter un nouveau taxon
    ctrl.addTaxon = function(newTaxon) {

        // Convertir respectivement statut, habitat et rang en id_statut, id_habitat et id_rang
        newTaxon.id_statut = newTaxon.statut.id_statut;
        newTaxon.id_habitat = newTaxon.habitat.id_habitat;
        newTaxon.id_rang = newTaxon.rang.id_rang;
        // Nettoyage des propriétés inutilisées
        delete newTaxon.statut;
        delete newTaxon.habitat;
        delete newTaxon.rang;

// faire une erreur si rang == '' : il faut à tout pris choisir quelque chose

// Envoi des données A FAIRE
        console.log('Taxon ajouté avec succès !');
        console.log(newTaxon);

    };

    
}]);

