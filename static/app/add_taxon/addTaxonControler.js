app.controller('addTaxonCtrl', ['$scope', 'TaxonService', 'loginSrv', function($scope, TaxonService, loginSrv) {

    var ctrl = this;
    ctrl.route = 'addTaxon';
    ctrl.csvFile = null,
    ctrl.csvData = [];
    ctrl.csvHeaders = [];


    // Vérifiez si l'utilisateur est admin, pour y adapter le contenu de la page
    ctrl.isAdmin = loginSrv.getCurrentUserRights().admin;

    // Charger les données au démarrage avec Promise.all
    Promise.all([
        TaxonService.getIdNomStatuts(),
        TaxonService.getIdNomHabitats(),
        TaxonService.getIdNomRangs(),
        TaxonService.getGroup1Inpn(),
        TaxonService.getGroup2Inpn()
    ]).then(([statuts, habitats, rangs, group1Inpn, group2Inpn]) => {
        ctrl.statuts = statuts;
        ctrl.habitats = habitats;
        ctrl.rangs = rangs;
        ctrl.group1Inpn = group1Inpn;
        ctrl.group2Inpn = group2Inpn;

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
        $scope.$broadcast('resetTaxHierarchy'); // Appel de resetTaxHierarchy (Directive) pour réinitialiser les saisies des rangs taxonomiques
    };


    // Insertion d'un nouveau taxon en Bdd
    ctrl.addTaxon = function(newTaxon) {
        TaxonService.addTaxon(newTaxon).then(response => {
            console.log('Taxon ajouté avec succès !', Object.keys(ctrl.newTaxon).length, ctrl.newTaxon);
            ctrl.resetForm(); // Réinitialisation du formulaire après l'ajout
        }).catch(error => {
            console.error("Erreur lors de l'ajout du taxon:", error);
        });
    }

    //--------------------- Ajout d'un nouveau taxon ------------------------------------

    ctrl.addTaxonForm = function(newTaxon) {
        // Vérification des champs obligatoires
        if (!newTaxon.lb_nom || !newTaxon.rang || newTaxon.group1_inpn === '' || newTaxon.group2_inpn === '') {
            alert("Veuillez remplir tous les champs obligatoires.\n A savoir : 'Nom du taxon', 'Rang', 'Groupe INPN 1' et 'Groupe INPN 2'");
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

        ctrl.addTaxon(newTaxon);

    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    // Fonction appelée lorsque le fichier est sélectionné
    ctrl.uploadCSV = function(file) {
        ctrl.csvFile = file;
    };

    // Fonction pour retirer le fichier CSV sélectionné
    ctrl.removeCSV = function() {
        ctrl.csvFile = null;
    };

    // Fonction pour ajouter tous les taxons compris dans le csv
    ctrl.addTaxonsCSV = function() {
        if (ctrl.csvFile) {
            Papa.parse(ctrl.csvFile, {
                complete: function(results) {
                    $scope.$apply(function() {
                        ctrl.csvData = results.data;
                        for (let i = 0; i < ctrl.csvData.length; i++) {
                            newTaxon = ctrl.csvData[i];
                            newTaxon.nom_complet = newTaxon.lb_nom + ' ' + newTaxon.lb_auteur;
                            ctrl.addTaxon(newTaxon);
                        }
                    });
                },
                header: true
            });
        } else {
            alert("Veuillez sélectionner un fichier CSV.");
        }
    };



}]);
