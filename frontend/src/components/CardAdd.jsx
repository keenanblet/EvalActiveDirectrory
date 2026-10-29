function CardAdd({ onClick }) {

    return (
        <div onClick={onClick} className="w-full max-w-xs cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700"> +
            </div>
            <h5 className="mt-4 text-lg font-semibold text-slate-800">Ajouter un Utilisateur</h5>
            <p className="text-sm text-slate-500"></p>
        </div>
    )
}

export default CardAdd
