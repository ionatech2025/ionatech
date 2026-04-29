import React from 'react';
import './Products.css';
import { ArrowRight } from 'lucide-react';
import { products as fallbackProducts } from '../../data/products';
import { getIcon } from '../../data/iconRegistry';
import { useContent } from '../../lib/api';

const Products = () => {
  const products = useContent('products', fallbackProducts);
  return (
    <section className="products-section">
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <h2 className="products-title">Our Products</h2>
          <p className="products-subtitle">
            Innovative solutions designed to transform your digital experience
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.filter((p) => p.published).map((product) => {
            const Icon = getIcon(product.iconName);
            return (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-overlay">
                  <div className="product-icon">{Icon ? <Icon className="w-6 h-6" /> : null}</div>
                </div>
              </div>

              <div className="product-content">
                <div className="product-category">{product.category}</div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>

                <button className="product-button">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
