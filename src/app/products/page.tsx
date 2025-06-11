'use client';
import Link from 'next/link';
import { products } from '../data/product';

export default function ProductsPage() {
  return (
    <div className="container mt-5">
      <h2>Our Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-3" key={product.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p><strong>{product.price}</strong></p>
                <Link href={`/products/${product.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
