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
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 flex items-center justify-center p-6 z-10 relative">
        <div className={hideHeaderFooter ? 'w-full' : 'w-full max-w-2xl'}>
          {children}
        </div>
      </main>
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
          <Route path="/editar-tarefa/:id" component={TarefaForm} />
          <Route path="/" exact component={LoginForm} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;