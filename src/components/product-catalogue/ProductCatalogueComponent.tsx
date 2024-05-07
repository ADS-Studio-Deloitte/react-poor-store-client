import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./ProductCatalogueComponent.css";
import { getProductCatalogue, postProduct } from "../../service/endpoints";
import { useForm, SubmitHandler } from "react-hook-form";
import CatalogueItemComponent from "../catalogue-item/CatalogueItemComponent";

const ProductCatalogueComponent = () => {
  const [productAddedInfo, setProductAddedInfo] = useState<{name: string} | null>(null);
  const [productList, setProductsList] = useState<any[]>([]);

  useEffect(() => {
    getProductCatalogue().then((response: any) => {
      try {
        setProductsList(response);
      } catch (error) {
        console.warn(error);
      }
    });
  }, []);

  const onAddProduct = (data: any) => {
    data.id = (Math.random() + 1).toString(36).substring(7);
    postProduct(data).then(() => {
      updateProductAddedInfo(data.name);
    });
  };

  const updateProductAddedInfo = (name: string) => {
    setProductAddedInfo({name});
    setTimeout(() => {
      setProductAddedInfo(null);
    }, 3000);
  };

  return (
    <div>
      <h2>Select products to buy</h2>

      <div className="catalogue">
        {productList.map((product, index) => (
          <CatalogueItemComponent
            key={index}
            product={product}
            onAddToCartButtonClick={onAddProduct}
          />
        ))}
      </div>

      {productAddedInfo && (
            <span className="product-added">
              {productAddedInfo.name} was added to your cart!
            </span>
          )}
          
    </div>
  );
};

export default ProductCatalogueComponent;
