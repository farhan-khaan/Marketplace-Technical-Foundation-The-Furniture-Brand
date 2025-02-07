const AboutSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-16">
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">
            From a studio in London to a global brand with over 400 outlets
          </h3>
          <p className="text-gray-600 mb-6">
            When we started The Furniture Brand, the idea was simple. Make high-quality furniture affordable and available to the mass
            market.
          </p>
          <p className="text-gray-600 mb-6">
            Handmade, and lovingly crafted furniture and homewares is what we live, breathe and design in our studio. Today,
            we have grown into a global brand and are bringing the Avion experience to homes everywhere.
          </p>
          <button className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 w-fit">
            Get in touch
          </button>
        </div>
        <div>
          <img
            src="/img/Image (2).png"
            alt="About Us"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
    );
  };
  
  export default AboutSection;
  