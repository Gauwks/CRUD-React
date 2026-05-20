import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Produto } from '../types';

interface ProdutosFormProps {
  currentProduto: Produto | null;
  onSave: () => void;
  onCancelEdit: () => void;
}

const ProdutosForm: React.FC<ProdutosFormProps> = ({ 
  currentProduto, 
  onSave, 
  onCancelEdit 
}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState<number>(0);

  useEffect(() => {
    if (currentProduto) {
      setNome(currentProduto.nome);
      setDescricao(currentProduto.descricao);
      setPreco(currentProduto.preco);
    } else {
      setNome('');
      setDescricao('');
      setPreco(0);
    }
  }, [currentProduto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const produtoData: Omit<Produto, 'id'> = {
      nome,
      descricao,
      preco: Number(preco),
    };

    try {
      if (currentProduto?.id) {
        await updateDoc(doc(db, 'produtos', currentProduto.id), produtoData);
      } else {
        await addDoc(collection(db, 'produtos'), produtoData);
      }

      // Limpar formulário
      setNome('');
      setDescricao('');
      setPreco(0);
      onSave();
    } catch (error) {
      alert('Erro ao salvar produto');
      console.error(error);
    }
  };

  return (
    <>
      <h2>{currentProduto ? ' Editar Produto' : '➕ Adicionar Novo Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Produto</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            rows={4}
            required 
          />
        </div>

        <div className="form-group">
          <label>Preço (R$)</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {currentProduto ? ' Salvar Alterações' : ' Adicionar Produto'}
          </button>
          
          {currentProduto && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProdutosForm;
