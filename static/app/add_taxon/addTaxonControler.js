app.controller('addTaxonCtrl', ['$scope', 'TaxonService', function($scope, TaxonService) {

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

        // Sauvegarder les valeurs par défaut dans une variable
        ctrl.defaultTaxon = {
            lb_nom: null,
            lb_auteur: null,
            nom_complet: null,
            nom_valide: null,
            nom_vern: null,
            nom_vern_eng: null,
            url: null,

            statut: ctrl.statuts.find(s => s.nom_statut === 'Non précisé'),
            id_statut: ctrl.statuts.find(s => s.nom_statut === 'Non précisé').id_statut,

            habitat: ctrl.habitats.find(h => h.nom_habitat === 'Non renseigné'),
            id_habitat: ctrl.habitats.find(h => h.nom_habitat === 'Non renseigné').id_habitat,

            id_rang: '',

            group1_inpn: null,
            group2_inpn: null,
            group3_inpn: null,
        };

        // Initialiser newTaxon avec les valeurs par défaut
        ctrl.resetForm("initialisation");

        // Appliquer les changements dans $scope
        $scope.$apply();
    }).catch(error => {
        console.error("Erreur lors du chargement des données:", error);
    });



    //--------------------- Fonctions utiles ------------------------------------

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

    // Réinitialisation des champs du formulaire
    ctrl.resetForm = function(status) {
        ctrl.newTaxon = angular.copy(ctrl.defaultTaxon);
        // Appeler refreshForm de la Directive pour réinitialiser les saisies des rangs taxonomiques
        // uniquement si ce n'est pas l'itnitialisation
        if (status != "initialisation") $scope.$broadcast('resetTaxHierarchy');
    };


//--------------------- Ajout d'un nouveau taxon ------------------------------------

    ctrl.addTaxon = function(newTaxon) {

        // Convertir respectivement statut, habitat et rang en id_statut, id_habitat et id_rang
        newTaxon.id_statut = newTaxon.statut.id_statut;
        newTaxon.id_habitat = newTaxon.habitat.id_habitat;
        newTaxon.id_rang = newTaxon.rang.id_rang;

        // Récupérer les rangs taxonomiques choisis
        newTaxon.regne = newTaxon.rangTaxonomique?.regne ?? null;
        newTaxon.phylum = newTaxon.rangTaxonomique?.phylum ?? null;
        newTaxon.classe = newTaxon.rangTaxonomique?.classe ?? null;
        newTaxon.ordre = newTaxon.rangTaxonomique?.ordre ?? null;
        newTaxon.famille = newTaxon.rangTaxonomique?.famille ?? null;
        newTaxon.sous_famille = newTaxon.rangTaxonomique?.sous_famille ?? null;
        newTaxon.tribu = newTaxon.rangTaxonomique?.tribu ?? null;

        // Nettoyage des propriétés inutilisées
        delete newTaxon.statut;
        delete newTaxon.habitat;
        delete newTaxon.rang;
        delete newTaxon.rangTaxonomique;

// faire une erreur si rang == '' : il faut à tout pris choisir quelque chose

// Envoi des données A FAIRE
        console.log('Taxon ajouté avec succès !');
        console.log(Object.keys(ctrl.newTaxon).length, ctrl.newTaxon);

        // Réinitialiser le formulaire après l'ajout
        ctrl.resetForm("initialisation");
    };
}]);
