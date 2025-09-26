import React from 'react';
import { Award } from 'lucide-react';

const Badges = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Award className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Badges</h1>
          <p className="text-gray-600">
            User badges and achievements will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Badges;

