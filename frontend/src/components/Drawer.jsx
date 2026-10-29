function Drawer({ onClose, nom, prenom, mail, service }) {
    return (
        <div id="drawer-example" className="fixed top-0 left-0 z-40 h-screen w-96 overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-lg" tabIndex={-1} aria-labelledby="drawer-label">
            <div className="mb-5 flex items-center border-b border-slate-200 pb-4">
                <h5 id="drawer-label" className="inline-flex items-center text-lg font-medium text-slate-800">
                    {nom} {prenom}
                </h5>
                <button type="button" onClick={onClose} aria-controls="drawer-example" className="absolute end-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-transparent text-slate-600 hover:bg-slate-100">
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                    <span className="sr-only">Close menu</span>
                </button>
            </div>
            <dl className="space-y-4 text-sm">
                {[['Nom', nom], ['Prénom', prenom], ['Email', mail], ['Service', service]].map(([label, value]) => (
                    <div key={label}>
                        <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
                        <dd className="mt-0.5 text-slate-800">{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
export default Drawer;
