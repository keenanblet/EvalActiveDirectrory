import { useState, useEffect } from 'react';
import Card from './components/Card';
import Drawer from './components/Drawer';
import CardAdd from './components/CardAdd';
import FormAdd from './components/FormAdd';
import { Link } from 'react-router-dom';
function ListUser() {

  const [user, setUser] = useState([]);
  const [saisie, setSaisie] = useState('');
  const [recherche, setRecherche] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);  
  const [currentContent, setCurrentContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(user);
  const terme = recherche.trim().toLowerCase();
  const filtered = user.filter((u) => 
    u.nom && [u.nom, u.prenom].some((champ) => champ?.toLowerCase().includes(terme))
  );
  const listUser = filtered.map((user) => (
  <Card onClick={() => { 
    setCurrentContent(user);
    setDrawerOpen(true);
  }}  
  key={user.login} 
  nom = {user.nom} 
  prenom={user.prenom} 
  mail={user.mail} 
  service={user.service ?? 'Service non spécifié'}
  />));
  return (
    <>
      <main className='mx-auto min-h-screen max-w-6xl bg-slate-50 px-4 py-8 text-slate-800'>
        <header className='flex items-center justify-between border-b border-slate-200 pb-4'>
          <h1 className='text-2xl font-semibold'>Annuaire</h1>
          <Link
            to="/orga"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
          >
            Organigramme
          </Link>
        </header>
        <form
          className='flex w-full max-w-xl mx-auto my-6 gap-2'
          onSubmit={(e) => {
            e.preventDefault();
            setRecherche(saisie);
          }}
        >
          <input
            type='search'
            placeholder='Rechercher un utilisateur...'
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            className='min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300'
          />
          <button
            type='submit'
            className='rounded-lg bg-slate-800 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-slate-700 active:bg-slate-900'
          >
            Rechercher
          </button>
          <button
            className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-600 transition-colors hover:bg-slate-100'
            onClick={(e) => {
              e.preventDefault();
              setRecherche("")
              setSaisie("");
            }}
          >
            Annuler
          </button>
        </form>
        
        {user && user.length > 0 ? (
          <div>
            <h2 className='mb-4 text-sm font-medium uppercase tracking-wide text-slate-500'>
              Utilisateurs ({filtered.length})
            </h2>
            
            {filtered.length > 0 ? (
              
              <div className='grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'><CardAdd onClick={() => {setModalOpen(true)}}/>{listUser}</div>
            ) : (
              <p className='py-10 text-center text-slate-500'>Aucun résultat</p>
            )}
          </div>
        ) : (
          <p className='py-10 text-center text-slate-500'>Chargement…</p>
        )}
        {modalOpen && <FormAdd onClose={() => setModalOpen(false)}/>}
        {drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} nom={currentContent.nom} prenom={currentContent.prenom} mail={currentContent.mail} service={currentContent.service ?? 'Service non spécifié'} />}
      </main>
    </>
  );
}

export default ListUser;
