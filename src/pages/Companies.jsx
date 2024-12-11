import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const companies = [
  {
    id: 1,
    name: 'Tech Innovators Inc.',
    email: 'info@techinnovators.com',
    address: '123 Innovation Street, Tech City',
    phone: '123-456-7890',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP0x6sxq8HSFEvEdnHM39TltrT1IJfvMow4w&s',
  },
  {
    id: 2,
    name: 'Green Energy Corp.',
    email: 'contact@greenenergy.com',
    address: '456 Solar Road, Eco Town',
    phone: '987-654-3210',
    image:
      'https://cdnimg.bnamericas.com/ppBsvUDoOgQAKiwqgNyqyzyHpVjTSMHjaxiXJcCNEjXjoSNBIgvYpGuNrtJnJPbY.png',
  },
  {
    id: 3,
    name: 'Fast Logistics Ltd.',
    email: 'support@fastlogistics.com',
    address: '789 Delivery Ave, Speed City',
    phone: '555-123-4567',
    image:
      'https://fastlogisticscargo.com/wp-content/uploads/2022/02/cropped-FL-logo.png',
  },

  {
    id: 4,
    name: 'State Farm',
    email: 'contact@statefarm.com',
    address: '1 State Farm Plaza, Bloomington, IL',
    phone: '800-782-8332',
    image:
      'data:image/png;base64,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',
  },
  {
    id: 5,
    name: 'Allianz',
    email: 'info@allianz.com',
    address: ' Munich, Germany',
    phone: '+49 89 3800 1000',
    image:
      'data:image/png;base64,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',
  },
  {
    id: 6,
    name: 'Geico',
    email: 'contact@geico.com',
    address: '5260 Western Ave, Washington, D.C.',
    phone: '800-861-8380',
    image:
      'data:image/png;base64,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',
  },
];

const Companies = () => {
  return (
    <>
      <div className="mb-[20px] text-center">
        <h1 className="text-[38px] text-primary">Our Companies</h1>
      </div>
      <div className="bg-secondary p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="mb-4 h-16 w-16"
                />
                <h2 className="mb-2 text-lg font-semibold text-primary">
                  {company.name}
                </h2>
                <p className="mb-1 text-sm text-gray-600">
                  <strong>Email:</strong> {company.email}
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  <strong>Address:</strong> {company.address}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {company.phone}
                </p>
                <div className="p-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-300 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-secondary">
                    <span className="text-primary">Our Plans</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
