import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Produto } from '../types';

interface ProdutosListProps {
  onEdit: (produto: Produto) => void;
  refresh?: boolean; // novo prop
}

const ProdutosList: React.FC<ProdutosListProps> = ({ onEdit, refresh }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = async () => {
    const querySnapshot = await getDocs(collection(db, 'produtos'));
    const produtosData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Produto[];
    setProdutos(produtosData);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      await deleteDoc(doc(db, 'produtos', id));
      fetchProdutos();
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [refresh]);

  return (
    <>
      <h2> Produtos Cadastrados</h2>
      {produtos.length === 0 ? (
        <p style={{textAlign: 'center', padding: '3rem', color: '#64748b'}}>
          Nenhum produto cadastrado ainda.
        </p>
      ) : (
        produtos.map(product => (
          <div key={product.id} className="produto-card">
            <h3>{product.nome}</h3>
            <p>{product.descricao}</p>
            <p className="preco">R$ {product.preco.toFixed(2)}</p>

            <div className="card-actions">
              <button 
                className="btn btn-edit"
                onClick={() => onEdit(product)}
              >
                 Editar
              </button>
              <button 
                className="btn btn-delete"
                onClick={() => product.id && handleDelete(product.id)}
              >
                 Deletar
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ProdutosList;
