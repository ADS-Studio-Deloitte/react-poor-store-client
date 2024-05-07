import React from 'react';
import "./CatalogueItemComponent.css";
import { Button } from '@mui/material';

interface IProps {
    product: any;
    onAddToCartButtonClick: (product: any) => void;
}

const CatalogueItemComponent: React.FC<IProps> = ({ product, onAddToCartButtonClick }) => {
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
                <Button variant="contained" color="warning" onClick={() => onAddToCartButtonClick(product)}>Add to cart</Button>
            </div>
        </div>
    );
};

export default CatalogueItemComponent;