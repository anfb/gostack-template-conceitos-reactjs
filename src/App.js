import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const {data} = await api.post('/repositories', {
      title: 'New Repository',
      url: 'http://github.com/anfb',
      techs: 'React, Node.js, Java'
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter( (repository) => repository.id !== id) );
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
