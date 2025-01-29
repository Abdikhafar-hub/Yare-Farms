const Testimonials = () => {
    const testimonials = [
      { id: 1, name: 'John Doe', comment: 'Great service and quality products!' },
      { id: 2, name: 'Jane Smith', comment: 'Highly recommend this farm.' },
    ];
  
    return (
      <div className="bg-custom-orange p-8">
        <h2 className="text-center text-2xl font-bold mb-8">Testimonials</h2>
        <div className="flex overflow-x-auto">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="flex-shrink-0 w-full md:w-1/2 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700">{testimonial.comment}</p>
                <p className="mt-4 text-right font-bold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Testimonials;