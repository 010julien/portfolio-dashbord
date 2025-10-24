# Portfolio Dashboard

Interface d'administration moderne pour gérer les projets et compétences de votre portfolio.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le dashboard sera accessible sur : `http://localhost:5174`

## ⚙️ Configuration

### Connexion à l'API Backend

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3001
```

Par défaut, l'application se connecte à `http://localhost:3001/api`

## 📋 Fonctionnalités

### 📊 Dashboard
- Vue d'ensemble des statistiques
- Graphiques de répartition des projets
- Compétences par catégorie
- Activités récentes

### 📁 Gestion des Projets
- Liste de tous les projets
- Créer un nouveau projet
- Modifier un projet existant
- Supprimer un projet
- Informations détaillées (titre, description, technologies, rôle, équipe, durée, liens, etc.)

### 🎯 Gestion des Compétences
- Liste groupée par catégorie
- Ajouter une compétence
- Modifier le niveau et le pourcentage
- Marquer comme active/inactive
- Catégories : Frontend, Backend, Database, Management, Cybersécurité, Design

### ⚙️ Paramètres
- Configuration de l'API
- Liens rapides vers le portfolio et la documentation
- Informations personnelles (référence)

## 🎨 Technologies utilisées

- **React 18** - Framework UI
- **React Router** - Navigation
- **TanStack Query** - Gestion d'état et cache
- **Axios** - Requêtes HTTP
- **Tailwind CSS** - Styling
- **Recharts** - Graphiques
- **Lucide React** - Icônes
- **Vite** - Build tool

## 🔗 Prérequis

Le **backend API** doit être démarré avant d'utiliser le dashboard.

```bash
cd ../Portfolio-Backend
npm run start:dev
```

## 📸 Captures d'écran

### Dashboard
- Statistiques en temps réel
- Graphiques interactifs
- Liste des activités

### Projets
- Grille de cartes
- Filtrage par statut
- Formulaire de création/édition

### Compétences
- Groupement par catégorie
- Barres de progression
- Badges de niveau

## 🛠️ Scripts disponibles

```bash
npm run dev      # Démarrer en mode développement
npm run build    # Construire pour la production
npm run preview  # Prévisualiser la version de production
```

## 📦 Structure du projet

```
Portfolio-Dashboard/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── Layout.jsx
│   │   ├── ProjectForm.jsx
│   │   └── SkillForm.jsx
│   ├── pages/          # Pages de l'application
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Settings.jsx
│   ├── lib/            # Utilitaires
│   │   └── api.js      # Configuration API
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🔒 Production

Pour déployer en production :

1. Modifier `.env` avec l'URL de production de l'API
2. Construire le projet :
   ```bash
   npm run build
   ```
3. Déployer le dossier `dist/` sur Vercel, Netlify, ou autre

## 💡 Astuces

- Les données sont mises en cache automatiquement avec TanStack Query
- Les formulaires valident les données avant l'envoi
- Les erreurs sont affichées en temps réel
- Le mode responsive fonctionne sur tous les appareils

## 🆘 Dépannage

### Le dashboard ne se connecte pas à l'API

1. Vérifiez que le backend est démarré
2. Vérifiez l'URL dans `.env`
3. Ouvrez la console du navigateur pour voir les erreurs

### Les données ne s'affichent pas

1. Vérifiez que le backend contient des données (utilisez `npm run seed`)
2. Vérifiez la console réseau du navigateur
3. Testez l'API directement : `http://localhost:3001/api/projects`

## 📞 Support

Pour toute question, consultez :
- Documentation API : `http://localhost:3001/api/docs`
- Guide de test : `../Portfolio-Backend/TEST_GUIDE.md`
