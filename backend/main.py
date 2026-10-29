from ldap3 import Server, Connection, SUBTREE, ALL, MODIFY_ADD
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paramètres de connexion
AD_SERVER = 'ldap://172.16.110.30'
AD_USER = 'administrator@keenan.local'
AD_PASSWORD = ':qykee123///'
AD_SEARCH_BASE = 'DC=keenan,DC=local'

# Connexion au serveur
server = Server(AD_SERVER, get_info=ALL)
conn = Connection(server, user=AD_USER, password=AD_PASSWORD, auto_bind=True)

# Requête LDAP : uniquement les personnes (exclut les comptes ordinateurs)
search_filter = '(&(objectClass=user)(objectCategory=person))'
attributes = ['sn', 'givenName','mail', 'sAMAccountName', 'department', 'telephoneNumber', 'directReports']  # Attributs à récupérer


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users")
def get_users():
    # Recherche refaite à chaque appel pour avoir la liste à jour
    conn.search(search_base=AD_SEARCH_BASE,
                search_filter=search_filter,
                search_scope=SUBTREE,
                attributes=attributes)

    # Conversion des entrées ldap3 en dictionnaires simples (sérialisables en JSON)
    return [
        {
            "nom": entry.sn.value,
            "prenom": entry.givenName.value,
            "login": entry.sAMAccountName.value,
            "mail": entry.mail.value,
            "service": entry.department.value,
            "tel": entry.telephoneNumber.value,
            "onlyManager": entry.directReports.value
        }
        for entry in conn.entries
    ]
