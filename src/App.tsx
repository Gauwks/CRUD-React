import { useState } from 'react';
import './App.css';
import ProdutosForm from './components/ProdutosForm';
import ProdutosList from './components/ProdutosList';
import type { Produto } from './types';

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
      <header>
        <h1>🛒 Mercado Preso</h1>
        <p>Gestão de Produtos</p>
      </header>

      <div className="produtos-form">
        <ProdutosForm
          currentProduto={currentProduto}
          onSave={handleSave}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <div className="produtos-lista">
        <ProdutosList onEdit={handleEdit} refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
