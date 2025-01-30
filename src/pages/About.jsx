const About = () => {
  return (
    <div id = "about" className="flex flex-col items-center text-center p-8">
      {/* Main Heading with One Word in Orange, Another in Green & Underline */}
      <h1 className="text-4xl font-bold mb-4">
        <span style={{ color: "#FF8C00" }}>About</span> <span className="text-green-600">Yare Farms</span>
      </h1>
      <div className="mt-2 flex justify-center">
        <span className="h-1 w-16 bg-green-600"></span>
      </div>

      <p className="text-gray-700 max-w-3xl mx-auto">
      Located in Nakuru County, we bring extensive experience in the Kienyeji improved chicken industry. Our hatchery ensures your farm is consistently supplied with high-quality, healthy Kienyeji improved chicks.
      </p>

      <div className="space-y-8 max-w-3xl mx-auto mt-6">
        <section>
          {/* Section Heading with Underline */}
          <h2 className="text-2xl font-bold mb-2">
            <span style={{ color: "#FF8C00" }}>Our</span> <span className="text-green-600">Story</span>
          </h2>
          <div className="mt-1 flex justify-center">
            <span className="h-1 w-16 bg-green-600"></span>
          </div>
          <p className="text-gray-700 mt-2">
          Yare Farm began as a passion-driven initiative, focused on enhancing local indigenous chicken breeds through imported eggs. Today, we have grown into a leading supplier of high-quality Kienyeji Improved chickens and eggs, serving farmers across Kenya with excellence and reliability
          </p>
        </section>

        <section>
          {/* Section Heading with Underline */}
          <h2 className="text-2xl font-bold mb-2">
            <span style={{ color: "#FF8C00" }}>Our</span> <span className="text-green-600">Mission</span>
          </h2>
          <div className="mt-1 flex justify-center">
            <span className="h-1 w-16 bg-green-600"></span>
          </div>
          <p className="text-gray-700 mt-2">
            We aim to improve poultry farming in Kenya by breeding superior indigenous chicken breeds and 
            supporting farmers with high-quality chicks at competitive prices.
          </p>
        </section>

        <section>
          {/* Section Heading with Underline */}
          <h2 className="text-2xl font-bold mb-2">
            <span style={{ color: "#FF8C00" }}>Why</span> <span className="text-green-600">Choose</span> <span style={{ color: "#FF8C00" }}>Us?</span>
          </h2>
          <div className="mt-1 flex justify-center">
            <span className="h-1 w-16 bg-green-600"></span>
          </div>
          <p className="text-gray-700 mt-2">
            Our commitment to quality, innovation, and sustainability sets us apart. 
            We support smallholder farmers with expert guidance and top-quality products.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
