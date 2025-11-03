import React from "react";
import "./Products.css";
import Driver from "../../assets/Driver.jpg";
import Phone from "../../assets/Phone.jpg";
import Pc from "../../assets/Pc.jpg";
import { ArrowRight, Code, Smartphone, Monitor } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      image: Driver,
      title: "Driver Management System",
      description: "Comprehensive fleet management solution for modern businesses",
      icon: <Code className="w-6 h-6" />,
      category: "Software Solutions"
    },
    {
      id: 2,
      image: Phone,
      title: "Mobile Applications",
      description: "Cross-platform mobile apps built with cutting-edge technology",
      icon: <Smartphone className="w-6 h-6" />,
      category: "Mobile Development"
    },
    {
      id: 3,
      image: Pc,
      title: "Desktop Applications",
      description: "Powerful desktop solutions for enterprise and personal use",
      icon: <Monitor className="w-6 h-6" />,
      category: "Desktop Development"
    }
  ];

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
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="product-image" 
                />
                <div className="product-overlay">
                  <div className="product-icon">
                    {product.icon}
                  </div>
                </div>
              </div>
              
              <div className="product-content">
                <div className="product-category">
                  {product.category}
                </div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                
                <button className="product-button">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
