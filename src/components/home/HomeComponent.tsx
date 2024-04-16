import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './HomeComponent.css';
import { postProduct } from '../../service/endpoints';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
    name: string
    category: string
    price: string
}

const HomeComponent = () => {
    const [ productAddedInfo, setProductAddedInfo ] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data: any) => {
        data.id = (Math.random() + 1).toString(36).substring(7);
        postProduct(data).then(() => {
            updateProductAddedInfo();
        });
    };

    const updateProductAddedInfo = () => {
        setProductAddedInfo(true);
        setTimeout(() => {
            setProductAddedInfo(false);
        }, 3000);
    }

    return (
        <div>
            <h2>Select your product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="product-definition-container">    
                    <TextField {...register("name")} id="name" label="Name" variant="outlined" className="text-field" />

                    <TextField {...register("category")} id="category" label="Category" variant="outlined" className="text-field" />

                    <TextField {...register("price")} id="price" label="Price" variant="outlined" type="number" className="text-field" />

                    <Button type="submit" variant="contained" color="primary" className='submit-button'>Submit</Button>

                    {productAddedInfo && <span className="product-added">Product was added to your cart!</span>}
                </div>
            </form>
        </div>
    );
};

export default HomeComponent;



