const PopularProducts = () => {
    const products = [
      {
        id: 1,
        name: "The Poplar suede sofa",
        price: "£980",
        image: "/img/Large.png", 
      },
      {
        id: 2,
        name: "The Dandy chair",
        price: "£250",
        image: "/img/chair.png", 
      },
      {
        id: 3,
        name: "The Dandy chair",
        price: "£250",
        image: "/img/Photo.png", 
      },
    ];
  
    return (
      <section className=" py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our popular products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.map((product,index) => (
              <div key={product.id} className={`${index==0?"col-span-2":""} text-center`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                /> 
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500">{product.price}</p>
                               
              </div> 
            ))}  
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
              View collection
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default PopularProducts;
  