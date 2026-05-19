import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Produto } from '../types';
interface ProdutosListProps {
  onEdit: (produto: Produto) => void;
}

const ProdutosList: React.FC<ProdutosListProps> = ({ onEdit }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = async () => {
    const querySnapshot = await getDocs(collection(db, 'produtos'));

    const produtosData = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Produto[];

    setProdutos(produtosData);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que desejar deletar este produto?')) {
      await deleteDoc(doc(db, 'produtos', id));
      fetchProdutos();
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <>
      <div className="produtosLista">
        <h2>Lista de Produtos</h2>

        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul>
            {produtos.map(product => (
              <li key={product.id}>
                <h3>{product.nome}</h3>
                <p>{product.descricao}</p>
                <p>Preço: R$ {product.preco.toFixed(2)}</p>

                <button onClick={() => onEdit(product)}>Editar</button>

                <button onClick={() => product.id && handleDelete(product.id)}> Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProdutosList;