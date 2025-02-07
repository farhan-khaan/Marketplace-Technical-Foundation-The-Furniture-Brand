import { BsTruck, BsRecycle } from "react-icons/bs";
import { FaHandsHelping, FaTags } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      title: "Next day as standard",
      desc: "Order before 3pm and get it the next day as standard.",
      icon: <BsTruck size={32} />,
    },
    {
      title: "Made by true artisans",
      desc: "Handmade crafted goods made with real passion and craftsmanship.",
      icon: <FaHandsHelping size={32} />,
    },
    {
      title: "Unbeatable prices",
      desc: "For our materials and quality, you won't find better prices anywhere.",
      icon: <FaTags size={32} />,
    },
    {
      title: "Recycled packaging",
      desc: "We use 100% recycled packaging to ensure our footprint is manageable.",
      icon: <BsRecycle size={32} />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12">
          What makes our brand different
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="text-gray-800 mb-4">{feature.icon}</div>

              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
