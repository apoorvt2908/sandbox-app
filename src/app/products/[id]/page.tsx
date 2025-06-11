'use client';
import { useParams } from 'next/navigation';
import { products } from '../../data/product';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return <div className="container mt-5"><h3>Product not found</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price: {product.price}</strong></p>
      <button className="btn btn-success">Buy Now</button>
    </div>
  );
}
