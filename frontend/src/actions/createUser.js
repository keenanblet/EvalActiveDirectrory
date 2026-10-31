const API_URL = 'http://127.0.0.1:8000';

export async function createUser({ prenom, nom, mail, service, tel }) {
    const res = await fetch(`${API_URL}/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Champs optionnels : null si vides (le backend les ignore)
        body: JSON.stringify({ prenom, nom, mail: mail || null, service: service || null, tel: tel || null }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        // 422 FastAPI : { detail: [{ loc, msg }, ...] }
        const message = Array.isArray(data?.detail)
            ? data.detail.map((d) => d.msg).join(', ')
            : data?.detail || 'Erreur lors de la création';
        throw new Error(message);
    }
    return data;
}
