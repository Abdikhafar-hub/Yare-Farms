import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 4,
    title: "Local (Kienyeji) vs. Hybrid Chickens: Which One to Choose?",
    image: "src/assets/images/VSS.png",
    description: "Understand the differences between local (Kienyeji) and hybrid chickens to make informed poultry business decisions.",
    link: "https://local-kienyeji-vs-hybrid-chickens.hashnode.dev/local-kienyeji-vs-hybrid-chickens-which-one-to-choose",
  },
  {
    id: 1,
    title: "10 Common Mistakes Beginners Make in Poultry Farming And How To Avoid Them",
    image: "src/assets/images/poultry.jpg",
    description: "Avoid common poultry farming mistakes that lead to losses. Learn how to manage your flock efficiently.",
    link: "https://mistakes-in-poultry-farming.hashnode.dev/10-common-mistakes-beginners-make-in-poultry-farming-and-how-to-avoid-them",
  },
  {
    id: 3,
    title: "Customer Satisfaction, Honesty and Delivering Quality Products In Poultry Farming",
    image: "src/assets/images/sat.png",
    description: "How to Practice Professionalism, Honesty And Ensure Customer Satisfaction in Poultry Farming.",
    link: "https://customer-satisfaction.hashnode.dev/customer-satisfaction-honesty-and-delivering-quality-products-in-poultry-farming",
  },
];

const BlogList = () => {
  return (
    <div id="blog"className="container mx-auto p-6">
      {/* Title with colored words using CSS inline styling */}
      <h2 className="text-center text-3xl font-bold mb-6">
        <span className="text-green-600">Poultry</span>{" "}
        <span style={{ color: "#FF8C00" }}>Farming</span>{" "}
        <span className="text-green-600">Blogs</span>
      </h2>

      {/* Underline styling for title */}
      <div className="mt-2 flex justify-center">
        <span className="h-1 w-16 bg-green-600"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-600">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.description}</p>
              <Link to={blog.link} className="text-blue-500 mt-4 inline-block">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
