from ldap3 import Server, Connection, SUBTREE, ALL, MODIFY_ADD
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import ValidationError as PydanticValidationError
import httpx
from ldap3.utils.dn import escape_rdn
from schemas import CreateUserRequest, CreateUserResponse
import unicodedata

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
    
def make_login(prenom: str, nom: str) -> str:
    # prenom.nom sans accents ni espaces, 20 caractères max (limite sAMAccountName)
    raw = f"{prenom}.{nom}".lower().replace(" ", "")
    ascii_login = unicodedata.normalize("NFKD", raw).encode("ascii", "ignore").decode()
    return ascii_login[:20]


@app.post("/users/create")
def create_user(req: CreateUserRequest):
    login = make_login(req.prenom, req.nom)
    dn = f"CN={escape_rdn(req.prenom + ' ' + req.nom)},CN=Users,{AD_SEARCH_BASE}"

    # Mêmes attributs que ceux lus dans /users (directReports est calculé par l'AD)
    attrs = {
        "givenName": req.prenom,
        "sn": req.nom,
        "displayName": f"{req.prenom} {req.nom}",
        "sAMAccountName": login,
        "userPrincipalName": f"{login}@keenan.local",
    }
    if req.mail:
        attrs["mail"] = req.mail
    if req.service:
        attrs["department"] = req.service
    if req.tel:
        attrs["telephoneNumber"] = req.tel

    ok = conn.add(dn, ["top", "person", "organizationalPerson", "user"], attrs)
    if not ok:
        status = 409 if conn.result.get("description") == "entryAlreadyExists" else 400
        raise HTTPException(status_code=status, detail=conn.result.get("message") or conn.result.get("description"))

    return CreateUserResponse(success=True, user_id=login)