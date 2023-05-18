import { useCallback, useEffect, useState } from "react";
import TableRow from "../../common/Table/TableRow";
import axios from "axios";
import styles from "./Crud.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import { Link } from "react-router-dom";

const Crud = () => {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/db.json");
        setProducts(response.data);
      } catch (error) {
        console.log("Error al obtener los productos", error);
      }
    };
    fetchProducts();
  }, []);

// usecallback para memorizar y asegurarnos de que no se creara una nueva instancia en cada renderizado
  const handleDelete = useCallback((productId) => {
    try {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      console.log("Producto eliminado con ID:", productId);
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }, [products]);


  const handleEdit = useCallback((productId) => {
    console.log("Editando producto con ID:", productId);
  }, []);


  return (
    <>
      <section className={styles["container"]} >
        <div className={styles["button-container"]}>
        <Link to="add">
          <ButtonPrimary>Agregar producto</ButtonPrimary>
        </Link>
        </div>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Marca</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th className={styles["actions-th"]}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id)}
                onEdit={() => handleEdit(product.id)}
              />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Crud;
