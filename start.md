# Comment démarrer l'app ?

L'app est composée de deux parties :

- **backend** : API FastAPI (Python) qui interroge l'Active Directory en LDAP → `http://127.0.0.1:8000`
- **frontend** : interface React + Vite + Tailwind → `http://localhost:5173`

## Prérequis

- Python 3.10+ et `pip`
- Node.js 18+ et `npm`
- Accès réseau au contrôleur de domaine AD (`172.16.110.30`, domaine `keenan.local`) : VPN / réseau du labo actif

## 1. Backend

Depuis la racine du projet :

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install fastapi "uvicorn[standard]" ldap3 httpx pydantic
uvicorn main:app --reload
```

L'API tourne sur http://127.0.0.1:8000 (doc interactive : http://127.0.0.1:8000/docs).

> Au démarrage, `main.py` se connecte directement à l'AD. Si le serveur est injoignable, uvicorn plante avec une erreur LDAP : vérifier le réseau.

## 2. Frontend

Dans un second terminal, depuis la racine du projet :

```powershell
cd frontend
npm install
npm run dev
```

Ouvrir http://localhost:5173.

## Routes de l'API

| Méthode | Route    | Description                                  |
|---------|----------|----------------------------------------------|
| GET     | `/`      | Test (Hello World)                           |
| GET     | `/users` | Liste des utilisateurs de l'AD               |
| POST    | `/users/create` | Création d'un utilisateur (voir `schemas.py`) |

## Configuration

Les paramètres AD sont en dur en haut de [backend/main.py](backend/main.py) :

- `AD_SERVER` : adresse du contrôleur de domaine
- `AD_USER` / `AD_PASSWORD` : compte de connexion
- `AD_SEARCH_BASE` : base de recherche LDAP

Le CORS n'autorise que `localhost:5173` et `127.0.0.1:5173` : si le port Vite change, mettre à jour `allow_origins`.

## Problèmes fréquents

- **`ModuleNotFoundError`** : le venv n'est pas activé ou une dépendance manque (`pip install ...`).
- **`LDAPSocketOpenError`** : l'AD n'est pas joignable (réseau / VPN / IP).
- **Erreur CORS dans le navigateur** : le frontend n'est pas lancé sur le port 5173.
- **Liste vide côté front** : le backend n'est pas lancé sur le port 8000.
