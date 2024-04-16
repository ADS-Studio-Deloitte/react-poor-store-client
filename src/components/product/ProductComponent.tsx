import React from "react";
import "./ProductComponent.css";
import { Button } from '@mui/material';

interface IProps {
    product: any;
    onRemoveButtonClick: (product: any) => void;
}

const ProductComponent = ({ product, onRemoveButtonClick }: IProps) => {
  const { name } = product;

  return (
    <div className="product">
      <div className="product-info">
        <h3>{name}</h3>
        {Object.entries(product).map(([key, value]) => {
            if (key !== 'name' && key !== 'id') {
                return (
                    <p key={key}>
                        {key}: {value as string}
                    </p>
                );
            }
            return null;
        })}
      </div>
      <div className="product-action">
        <Button variant="contained" color="warning" onClick={() => onRemoveButtonClick(product)}>remove</Button>
      </div>
    </div>
  );
};

export default ProductComponent;
