import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Produto } from '../types';

interface ProdutosFormProps {
  currentProduto: Produto | null;
  onSave: () => void;
  onCancelEdit: () => void;
}

const ProdutosForm: React.FC<ProdutosFormProps> = ({ currentProduto, onSave, onCancelEdit }) => {
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

    const produtoData: Produto = {
      nome,
      descricao,
      preco: Number(preco),
    };

    if (currentProduto && currentProduto.id) {
      const produtoRef = doc(db, 'produtos', currentProduto.id);
      await updateDoc(produtoRef, produtoData as any);
    } else {
      await addDoc(collection(db, 'produtos'), produtoData as any);
    }

    setNome('');
    setDescricao('');
    setPreco(0);
    onSave();
  };

  return (
    <div>
      <h2>{currentProduto ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Preço</label>
          <input type="text" value={preco} onChange={(e) => setPreco(Number(e.target.value))} required />
        </div>
        <button type="submit">{currentProduto ? 'Salvar Alterações' : 'Adicionar Produto'}</button>
        {currentProduto && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar Edição
          </button>
        )}
      </form>
    </div>
  );
};

export default ProdutosForm;
