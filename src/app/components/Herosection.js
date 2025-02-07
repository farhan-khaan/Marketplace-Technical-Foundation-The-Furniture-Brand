const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row py-6 px-[8%] bg-gray-50 gap-0">
      {/* Left Section */}
      <div className="flex flex-col justify-between p-6 md:p-8 bg-indigo-900 text-white lg:w-[60%]">
        <div className="py-">
          <h1 className="text-2xl md:text-4xl leading-tight">
            The furniture brand for the future, with timeless designs
          </h1>
          <button className="px-6 py-2 bg-[#4e4b66] text-white mt-5 hover:bg-[#3c3a50] transition">
            View collection
          </button>
        </div>

        <div>
          <p className="text-base md:text-lg leading-relaxed">
            A new era in eco-friendly furniture with Furniture Brand, the French luxury
            retail brand with nice fonts, tasteful colors, and a beautiful way
            to display things digitally using modern web technologies.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center lg:w-[40%] bg-[#83A9AC]">
        <img
          src="img/chair.png"
          alt="Hero Image"
          className="w-[40%] md:w-[50%] lg:w-full object-fill"
        />
      </div>
    </div>
  );
};

export default HeroSection;
