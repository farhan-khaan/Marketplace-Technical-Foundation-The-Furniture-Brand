const ProductGrid = () => {
    const products = [
      { name: "The Dandy Chair", price: "£250", img: "/img/chair.png" },
      { name: "Rustic Vase Set", price: "£155", img: "img/Photo.png" },
      { name: "The Silky Vase", price: "£125", img: "img/Photo (1).png" },
      { name: "The Lucy Lamp", price: "£399", img: "img/Photo (2).png" },
    ];
  
    return (
      <div className="py-16 px-24">
        <h2 className="text-3xl font-bold mb-8">New ceramics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={product.img}
                alt={product.name}
                className="h-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-indigo-900 text-white rounded-md">
            View collection
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductGrid;
  