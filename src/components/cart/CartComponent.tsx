import React from "react";
import { useEffect, useState } from "react";
import ProductComponent from "../product/ProductComponent";
import "./CartComponent.css";
import { getCart, removeProduct } from "../../service/endpoints";

const CartComponent = () => {
  const [productList, setProductsList] = useState<any[]>([]);

  const onRemoveButtonClick = (product: any): void => {
    removeProduct(product).then((response) => {
      setProductsList(productList.filter((p) => p.id !== product.id));
    });
  };

  useEffect(() => {
    getCart().then((response: any) => {
      try {
        setProductsList(response);
      } catch (error) {
        console.warn(error);
      }
    });
  }, []);

  return (
    <div className="cart-container">
      <h2>Your cart:</h2>
      <div className="cart">
        {productList.map((product, index) => (
          <ProductComponent
            key={index}
            product={product}
            onRemoveButtonClick={onRemoveButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CartComponent;
