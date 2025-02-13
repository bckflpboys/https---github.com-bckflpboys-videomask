'use client';

import { motion } from 'framer-motion';
import { MdPhoneIphone, MdAccessTime, MdLocationOn, MdCameraAlt, MdMovie } from 'react-icons/md';
import { BsShieldCheck } from 'react-icons/bs';

const benefits = [
  {
    title: 'Device-Specific Metadata',
    description: 'Make your videos appear as if they were recorded from popular devices like iPhone 14 Pro, Samsung S23 Ultra, and more.',
    icon: <MdPhoneIphone className="w-10 h-10 text-blue-600" />,
  },
  {
    title: 'Authentic Timestamps',
    description: 'Customize recording dates and times to match your narrative and maintain authenticity across platforms.',
    icon: <MdAccessTime className="w-10 h-10 text-blue-600" />,
  },
  {
    title: 'Location Data Control',
    description: 'Add or modify GPS coordinates and location metadata to match your desired recording location.',
    icon: <MdLocationOn className="w-10 h-10 text-blue-600" />,
  },
  {
    title: 'Camera Settings Simulation',
    description: 'Replicate specific camera settings like ISO, aperture, and shutter speed from various devices.',
    icon: <MdCameraAlt className="w-10 h-10 text-blue-600" />,
  },
  {
    title: 'Multiple Format Support',
    description: 'Support for various video formats including MP4, MOV, and AVI, with quality preservation.',
    icon: <MdMovie className="w-10 h-10 text-blue-600" />,
  },
  {
    title: 'Secure Processing',
    description: 'All video processing is done locally on your device, ensuring complete privacy and security of your content.',
    icon: <BsShieldCheck className="w-10 h-10 text-blue-600" />,
  },
];

export default function Benefits() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Video{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Metadata Masking
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make your videos appear authentic and native to any device with our advanced metadata manipulation tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30"
            >
              <div className="text-blue-600 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl">
            <span className="px-4 py-2 text-sm text-gray-600">
              Trusted by content creators worldwide
            </span>
            <span className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-900">
              100% Metadata Accuracy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
