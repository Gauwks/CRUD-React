import { useState } from 'react';
import './App.css';
import ProdutosForm from './components/ProdutosForm';
import ProdutosList from './components/ProdutosList';
import type { Produto } from '../src/types/index';

function App() {
  const [currentProduto, setCurrentProduto] = useState<Produto | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (produto: Produto) => {
    setCurrentProduto(produto);
  };

  const handleSave = () => {
    setCurrentProduto(null);
    setRefresh(!refresh);
  };

  const handleCancelEdit = () => {
    setCurrentProduto(null);
  };

  return (
    <div className="App">
      <h1>Minha Lojinha CRUD</h1>
      <ProdutosForm
        currentProduto={currentProduto}
        onSave={handleSave}
        onCancelEdit={handleCancelEdit}
      />
      <ProdutosList onEdit={handleEdit} />
    </div>
  );
}

export default App;
