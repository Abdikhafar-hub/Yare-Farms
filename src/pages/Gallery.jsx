const Gallery = () => {
  const images = [
    { id: 1, src: '/images/gallery1.jpg', alt: 'Poultry Farm 1' },
    { id: 2, src: '/images/gallery2.jpg', alt: 'Poultry Farm 2' },
    { id: 3, src: '/images/gallery3.jpg', alt: 'Poultry Farm 3' },
    { id: 4, src: '/images/gallery4.jpg', alt: 'Poultry Farm 4' },
    { id: 5, src: '/images/gallery5.jpg', alt: 'Poultry Farm 5' },
    { id: 6, src: '/images/gallery6.jpg', alt: 'Poultry Farm 6' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-green-700">Our</span> <span className="text-orange-500">Gallery</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map(image => (
          <div key={image.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={image.src} alt={image.alt} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
