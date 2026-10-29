const inputClass = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200';
const labelClass = 'block text-xs font-medium uppercase tracking-wide text-slate-500';

function FormAdd({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">Ajouter un utilisateur</h2>
                    <p className="mt-0.5 text-sm text-slate-500">Renseignez les informations du nouvel utilisateur.</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className={labelClass}>
                            Prénom
                            <input type="text" placeholder="Jean" className={inputClass} />
                        </label>
                        <label className={labelClass}>
                            Nom
                            <input type="text" placeholder="Dupont" className={inputClass} />
                        </label>
                    </div>
                    <label className={labelClass}>
                        Email
                        <input type="email" placeholder="jean.dupont@entreprise.fr" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        Service
                        <input type="text" placeholder="Informatique" className={inputClass} />
                    </label>

                    <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 active:bg-indigo-700"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormAdd;
