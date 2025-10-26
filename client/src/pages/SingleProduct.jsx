import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { formatVND } from "../utils/currency";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { generateProductStructuredData } from "../utils/structuredData";
import { getImageUrl } from "../utils/config";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { products, navigate, addToCart, cartItems } = useAppContext();
  const { id } = useParams();
  
  const product = useMemo(() => products.find((p) => p._id === id), [products, id]);
  
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);
  
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p._id !== product._id && p.inStock)
      .slice(0, 5);
  }, [products, product]);

  // SEO and Structured Data
  const productStructuredData = useMemo(() => product ? generateProductStructuredData(product) : null, [product]);
  const seoProps = useMemo(() => product ? {
    title: `${product.name} | Vinitamart`,
    description: Array.isArray(product.description) ? product.description.join(' ') : product.description,
    keywords: `${product.name}, ${product.category}, buy online, Vinitamart`,
  } : {}, [product]);

  useEffect(() => {
    if (!productStructuredData) return;
    const scriptId = 'product-structured-data';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(productStructuredData);
  }, [productStructuredData]);

  if (!product) {
    return <div className="text-center py-40">Loading product details...</div>;
  }
  
  const handleAddToCart = () => {
    addToCart(product._id);
    toast.success(`${product.name} added to cart!`);
  }
  
  const handleBuyNow = () => {
    addToCart(product._id);
    navigate("/cart");
    window.scrollTo(0, 0);
  }

  const itemQuantity = cartItems?.[product._id] || 0;

  return (
    <div className="py-12 md:py-20">
      <SEO {...seoProps} />
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> / 
          <Link to="/products" className="hover:text-primary"> Products</Link> / 
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary"> {product.category}</Link> / 
          <span className="text-text-body"> {product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 justify-center">
              {product.image?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${thumbnail === image ? 'border-primary' : 'border-border'} transition-all`}
                >
                  <img src={getImageUrl(image)} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-border">
              <img src={getImageUrl(thumbnail)} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-header">{product.name}</h1>
            <p className="text-text-muted mt-2 text-lg">{product.category}</p>

            <div className="mt-6 flex items-baseline gap-4">
              <p className="text-3xl font-bold text-primary">{formatVND(product.offerPrice)}</p>
              <p className="text-xl text-text-muted line-through">{formatVND(product.price)}</p>
            </div>
            
            <p className="text-green-600 font-semibold mt-2">{product.inStock ? "In Stock" : "Out of Stock"}</p>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-text-header mb-3">About This Product</h2>
              <div className="prose text-text-body">
                <ul className="list-disc pl-5 space-y-2">
                  {Array.isArray(product.description) ? (
                    product.description.map((desc, index) => <li key={index}>{desc}</li>)
                  ) : (
                    <li>{product.description || 'No description available'}</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                disabled={!product.inStock}
              >
                {itemQuantity > 0 ? `Add One More (${itemQuantity})` : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-colors"
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-header">You Might Also Like</h2>
          </div>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {relatedProducts.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;