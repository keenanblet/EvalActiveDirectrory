import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tree, TreeNode } from 'react-organizational-chart';

function Organigramme() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error(err));
    }, []);

    const validUsers = user.filter((u) => u.nom?.trim() && u.prenom?.trim());
    const listService = [...new Set(validUsers.map((u) => u.service || 'Sans service'))];

    // Les employés sont empilés dans la carte de leur service : l'arbre reste
    // étroit (une colonne par service) au lieu de s'étaler sur la largeur.
    const Service = listService.map((serv) => (
        <TreeNode
            key={serv}
            label={
                <div className="inline-block max-w-[9rem] sm:max-w-[13rem] rounded-xl bg-white shadow-md ring-1 ring-slate-200 overflow-hidden text-left">
                    <div className="bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white truncate">
                        {serv}
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {validUsers
                            .filter((u) => (u.service || 'Sans service') === serv)
                            .map((u, i) => (
                                <li
                                    key={u.id ?? i}
                                    className="px-3 py-1.5 text-xs sm:text-sm text-slate-700 truncate"
                                    title={`${u.prenom} ${u.nom}`}
                                >
                                    {u.prenom} {u.nom}
                                </li>
                            ))}
                    </ul>
                </div>
            }
        />
    ));

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-8">
            <header className="mx-auto mb-8 flex max-w-6xl items-center justify-between border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-semibold text-slate-800">Organigramme</h1>
                <Link
                    to="/"
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
                >
                    Annuaire
                </Link>
            </header>
            {/* Filet de sécurité : si vraiment trop de services, scroll horizontal dans la zone et pas sur la page */}
            <div className="mx-auto w-full max-w-full overflow-x-auto pb-4">
                <div className="mx-auto w-fit min-w-0">
                    <Tree
                        lineWidth={'2px'}
                        lineColor={'#818cf8'}
                        lineBorderRadius={'12px'}
                        label={
                            <div className="inline-block rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white shadow-lg">
                                Directeur Général
                            </div>
                        }
                    >
                        {Service}
                    </Tree>
                </div>
            </div>
        </div>
    );
}

export default Organigramme;
