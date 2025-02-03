import React from "react";

const Services = () => {
  const services = [
    { id: 1, name: "Incubation Service", image: "/images/incubation.jpg" },
    { id: 2, name: "Poultry Consulting Services", image: "/images/con.jpeg" },
    { id: 3, name: "Vaccination Services", image: "/images/vacc.jpeg" },
    { id: 4, name: "Poultry Equipments: Drinkers, feeders etc", image: "/images/feeder.jpeg" },
  ];

  return (
    <div id="services" className="py-12 bg-white text-center">
      
      <h2 className="text-3xl font-bold mb-4">
        <span style={{ color: "#FF8C00" }}>Our</span> <span className="text-green-600">Services</span>
      </h2>
      <div className="mt-2 flex justify-center">
        <span className="h-1 w-16 bg-green-600"></span>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white border rounded-lg text-center shadow-md w-64 h-64 mx-auto flex flex-col items-center justify-center p-4"
          >
            
            <div className="w-40 h-24 mb-3">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
