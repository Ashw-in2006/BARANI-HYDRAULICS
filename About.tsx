import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-4">
            BARANI HYDRAULICUS INDIA PRIVATE LIMITED is a leading manufacturer and supplier
            of high-quality hydraulic equipment and solutions. With years of experience in
            the industry, we have established ourselves as a trusted partner for businesses
            across India.
          </p>
          <p className="text-gray-600 mb-4">
            Our commitment to quality, innovation, and customer satisfaction drives
            everything we do. We specialize in providing comprehensive hydraulic solutions
            that meet the diverse needs of our clients across various industries.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To provide innovative and reliable hydraulic solutions that empower our
            customers to achieve their operational goals while maintaining the highest
            standards of quality and service.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;