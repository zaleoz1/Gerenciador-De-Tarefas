import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import TarefaForm from './components/Tarefas/TarefaForm';
import TarefaList from './components/Tarefas/TarefaList';
import { getToken } from './utils/jwt';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/tarefas">
            {isAuthenticated ? <TarefaList /> : <LoginForm />}
          </Route>
          <Route path="/nova-tarefa">
            {isAuthenticated ? <TarefaForm /> : <LoginForm />}
          </Route>
          <Route path="/" exact>
            {isAuthenticated ? <TarefaList /> : <LoginForm />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;