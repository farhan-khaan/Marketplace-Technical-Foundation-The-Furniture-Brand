const Footer = () => {
    return (
      <footer className="bg-indigo-900 text-white px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-300">
              <li>New arrivals</li>
              <li>Best sellers</li>
              <li>Recently viewed</li>
              <li>Popular this week</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Furniture</li>
              <li>Homeware</li>
              <li>Garden</li>
              <li>Clothing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Our company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>About us</li>
              <li>Vacancies</li>
              <li>Contact us</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Join our mailing list</h4>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-2 rounded-l-md w-full text-gray-700 focus:outline-none"
              />
              <button className="bg-white text-indigo-900 px-4 py-2 rounded-r-md">
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-300 mt-8">
          <p>Copyright © 2022 Avion Ltd</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  