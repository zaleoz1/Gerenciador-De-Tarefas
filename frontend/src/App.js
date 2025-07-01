import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import TarefaForm from './components/Tarefas/TarefaForm';
import TarefaList from './components/Tarefas/TarefaList';
import { getToken } from './utils/jwt';

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-blue-300 flex flex-col">
      {!hideHeaderFooter && (
        <header className="bg-white/80 backdrop-blur shadow-md py-6 px-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">Gerenciador de Tarefas</h1>
          {isAuthenticated && (
            <nav>
              <a href="/tarefas" className="text-blue-700 font-medium hover:underline mx-2">Tarefas</a>
              <a href="/nova-tarefa" className="text-blue-700 font-medium hover:underline mx-2">Nova Tarefa</a>
            </nav>
          )}
        </header>
      )}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className={hideHeaderFooter ? 'w-full' : 'w-full max-w-2xl'}>
          {children}
        </div>
      </main>
      {!hideHeaderFooter && (
        <footer className="bg-white/80 backdrop-blur text-center text-gray-500 py-4 text-sm shadow-inner">
          © {new Date().getFullYear()} Gerenciador de Tarefas. Desenvolvido com <span className="text-blue-600">Tailwind CSS</span>.
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/tarefas" component={TarefaList} />
          <Route path="/nova-tarefa" component={TarefaForm} />
          <Route path="/" exact component={LoginForm} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;