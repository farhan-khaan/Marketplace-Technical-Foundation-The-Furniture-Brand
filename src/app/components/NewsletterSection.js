const NewsletterSection = () => {
    return (
      <div className="bg-white px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the club and get the benefits</h2>
          <p className="text-gray-600 mb-6">
            Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop-up stores, and more.
          </p>
          <div className="flex items-center justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="border border-gray-300 px-4 py-2 w-1/2 rounded-l-md focus:outline-none"
            />
            <button className="bg-indigo-900 text-white px-6 py-2 rounded-r-md hover:bg-indigo-800">
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewsletterSection;
  