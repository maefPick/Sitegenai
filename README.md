# Générateur de site HTML par LLM

Ce projet permet de générer automatiquement un site web statique (HTML) en interrogeant un LLM (Large Language Model, ex : OpenAI GPT-3.5/4) directement depuis le navigateur, sans backend.

## Fonctionnalités
- Saisie d'une description de site à générer
- Appel à l'API LLM (OpenAI par défaut, adaptable HuggingFace)
- Affichage du code HTML généré et aperçu en direct
- Téléchargement du code HTML généré
- 100% HTML/JS, aucune dépendance serveur

## Utilisation
1. Ouvrez `index.html` dans votre navigateur.
2. Saisissez votre clé API LLM (OpenAI ou HuggingFace).
3. Décrivez le site à générer (ex : "Un site portfolio pour un photographe").
4. Cliquez sur "Générer le site".
5. Visualisez le résultat et téléchargez le HTML si besoin.

## Documentation Clé API LLM
- **OpenAI** : Créez une clé sur https://platform.openai.com/account/api-keys
- **HuggingFace** : Créez un token sur https://huggingface.co/settings/tokens
- La clé API n'est jamais stockée, elle reste dans votre navigateur.
- **Ne partagez jamais votre clé API publiquement.**

## Structure du projet
- `index.html` : Interface utilisateur, documentation, aperçu, boutons
- `toto.js` : Logique JS pour l'appel à l'API, affichage, téléchargement

## Adaptation HuggingFace
Pour utiliser HuggingFace, adaptez la fonction d'appel API dans `toto.js` selon la documentation officielle de l'API Inference HuggingFace.

## Sécurité
- La clé API est utilisée uniquement côté client
- Attention à l'exposition de la clé (risque d'abus si partagée)

## Exemples de prompts
- "Un site portfolio pour un designer UX."
- "Un blog simple sur la cuisine italienne."
- "Une page d’accueil pour une startup tech."

## Limites
- Dépend du quota de votre clé API LLM
- Le code généré dépend de la qualité du prompt et du modèle

---

**Auteur :** [Votre nom]
**Licence :** MIT
