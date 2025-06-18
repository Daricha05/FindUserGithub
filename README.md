# GitHub User Search

🔍 Une application web simple pour rechercher des utilisateurs GitHub avec une interface élégante et réactive.

## Fonctionnalités

- Recherche d'utilisateurs par nom ou pseudo
- Affichage des résultats sous forme de cartes animées
- Barre de recherche fixe (sticky) lors du défilement
- Indicateur visuel de chargement
- Gestion des erreurs et résultats vides
- Design responsive (mobile & desktop)

## Technologies Utilisées

- HTML5, CSS3 (animations, flexbox)
- JavaScript (async/await, fetch API)
- [Bootstrap 5](https://getbootstrap.com/) pour le layout
- [Font Awesome](https://fontawesome.com/) pour les icônes
- API GitHub REST v3

## Comment ça marche

1. Entrez un terme de recherche (nom ou pseudo)
2. L'application interroge l'API GitHub
3. Les résultats s'affichent avec une jolie animation
4. Cliquez sur "Voir le profil" pour accéder au profil complet

## Concepts JavaScript Expliqués

- Utilisation moderne de `async/await` pour les requêtes asynchrones
- Gestion des Promises avec `fetch()`
- Manipulation du DOM dynamique
- Gestion d'erreurs avec `try/catch`

## Aperçu

![Capture d'écran du projet](findUserGithub.png)

## Améliorations Possibles

- Ajouter la pagination des résultats
- Implémenter un système de cache
- Afficher plus d'informations sur chaque utilisateur

