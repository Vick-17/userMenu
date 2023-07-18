export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Tableaux des jours de la semaine et des mois
    const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    // Récupération du jour de la semaine, du jour du mois et du mois
    const jourSemaine = joursSemaine[date.getDay()];
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];

    // Formatage de la date
    const dateFormatee = `${jourSemaine} ${jour} ${moisNom}`;

    return dateFormatee;
}

export const verifDate = (date) => {
    const regexp = /^\d{4}-\d{2}-\d{2}$/;

    if (regexp.test(date)) {
        // Vérifiez que la date est réellement valide (par exemple, pas de 30 février).
        let parts = date.split('-');
        let annee = parseInt(parts[0], 10);
        let mois = parseInt(parts[1], 10);
        let jour = parseInt(parts[2], 10);

        let nouvelleDate = new Date(annee, mois - 1, jour);

        if (nouvelleDate.getFullYear() === annee && nouvelleDate.getMonth() + 1 === mois && nouvelleDate.getDate() === jour) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
