import { useState } from 'react'

// Classes écrites en entier pour que Tailwind les détecte
const couleurs = [
    'bg-indigo-100 text-indigo-700',
    'bg-red-100 text-red-700',
    'bg-green-100 text-green-700',
    'bg-gray-100 text-gray-700',
]

function Card({ nom, prenom, mail, service, onClick }) {
    const initiale = (prenom?.[0] ?? '') + (nom?.[0] ?? '');
    const [couleur] = useState(() => couleurs[Math.floor(Math.random() * couleurs.length)]);
    return (
        <div onClick={onClick} className="w-full max-w-xs cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${couleur} text-xl font-semibold`}>
                {initiale}
            </div>
            <h5 className="mt-4 text-lg font-semibold text-slate-800">{prenom} {nom}</h5>
            <p className="text-sm text-slate-500">{mail}</p>
            <span className="mt-3 inline-block rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
                {service}
            </span>
        </div>
    )
}

export default Card
