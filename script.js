async function searchUsers() {
    // Récupération des éléments DOM et valeurs
    const searchTerm = document.getElementById('searchTerm').value.trim();
    const resultDiv = document.getElementById('result');
    const userListDiv = document.getElementById('userList');
    const searchText = document.getElementById('searchText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Réinitialisation de l'UI
    userListDiv.innerHTML = '';
    resultDiv.innerHTML = '';

    // Validation de l'input
    if (!searchTerm) {
        resultDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle me-2"></i>
                Veuillez entrer le nom de l'utilisateur
            </div>
        `;
        return;
    }

    // Affichage du statut "Chargement"
    searchText.textContent = 'Recherche...';
    loadingSpinner.style.display = 'inline-block';

    // Requête API avec async/await
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}+in:login,in:name&per_page=100`);

        // Gestion des erreurs HTTP
        if (!response.ok) {
            throw new Error(response.status === 403 ?
                'Limite de requêtes API atteinte. Veuillez patienter.' :
                'Erreur lors de la recherche');
        }

        // Conversion de la réponse en JSON
        const data = await response.json();

        // Gestion des résultats vides
        if (data.items.length === 0) {
            resultDiv.innerHTML = `
                <div class="no-results">
                    <i class="far fa-frown fa-3x mb-3"></i>
                    <h4>Aucun utilisateur trouvé</h4>
                    <p>Essayez avec un autre terme de recherche</p>
                </div>
            `;
            return;
        }

        // Affichage du nombre de résultats
        resultDiv.innerHTML = `
            <div class="result-count">
                <i class="fas fa-users me-2"></i>
                ${data.total_count.toLocaleString()} résultats trouvés
            </div>
        `;

        // Création des cartes utilisateurs
        data.items.forEach((user, index) => {
            const userCard = document.createElement('div');
            userCard.className = 'col-md-6 col-lg-4 fade-in';
            userCard.style.animationDelay = `${index * 0.05}s`;
            userCard.innerHTML = `
                <div class="user-card">
                    <div class="user-header">
                        <img src="${user.avatar_url}" alt="Avatar" class="user-avatar">
                        <div class="user-info">
                            <h3 class="username" title="${user.login}">${user.login}</h3>
                            ${user.type ? `<span class="badge user-type-badge bg-secondary">${user.type}</span>` : ''}
                        </div>
                    </div>
                    <a href="${user.html_url}" class="profile-link" target="_blank">
                        <i class="fas fa-external-link-alt me-2"></i>Voir le profil complet
                    </a>
                </div>
            `;
            userListDiv.appendChild(userCard);
        });

    } catch (error) {
        // Gestion des erreurs
        resultDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle me-2"></i>
                ${error.message}
            </div>
        `;
    } finally {
        // Réinitialisation du bouton
        searchText.textContent = 'Rechercher';
        loadingSpinner.style.display = 'none';
    }
}

// Allow search on Enter key press
document.getElementById('searchTerm').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchUsers();
    }
});