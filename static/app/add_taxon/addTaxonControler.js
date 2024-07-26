app.controller('addTaxonCtrl', ['$scope', 'TaxonService', 'loginSrv', function($scope, TaxonService, loginSrv) {

    var ctrl = this;
    ctrl.route = 'addTaxon';

    // Vérifiez si l'utilisateur est admin, pour y adapter le contenu de la page
    ctrl.isAdmin = loginSrv.getCurrentUserRights().admin;

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

            group1_inpn: '',
            group2_inpn: '',
            group3_inpn: null,
        };

        // Initialiser newTaxon avec les valeurs par défaut
        ctrl.resetForm();

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

    // Réinitialisation des champs du formulaire
    ctrl.resetForm = function() {
        ctrl.newTaxon = angular.copy(ctrl.defaultTaxon);
        // Appeler resetTaxHierarchy de la Directive pour réinitialiser les saisies des rangs taxonomiques
        $scope.$broadcast('resetTaxHierarchy');
    };



//--------------------- Ajout d'un nouveau taxon ------------------------------------

    ctrl.addTaxon = function(newTaxon) {
        // Vérification des champs obligatoires
        if (!newTaxon.lb_nom || !newTaxon.rang || newTaxon.group1_inpn === '' || newTaxon.group2_inpn === '') {
            alert("Veuillez remplir tous les champs obligatoires.\n(A savoir : 'Nom du taxon', 'Rang', 'Groupe INPN 1' et 'Groupe INPN 2'");
            return;
        }

        // Convertions respectives de statut, habitat et rang en id_statut, id_habitat et id_rang
        newTaxon.id_statut = newTaxon.statut.id_statut;
        newTaxon.id_habitat = newTaxon.habitat.id_habitat;
        newTaxon.id_rang = newTaxon.rang.id_rang;

        // Récupération des rangs taxonomiques choisis
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

// Envoi des données A FAIRE
        console.log('Taxon ajouté avec succès !');
        console.log(Object.keys(ctrl.newTaxon).length, ctrl.newTaxon);

        // Réinitialisation du formulaire après l'ajout
        ctrl.resetForm();
    };
}]);
