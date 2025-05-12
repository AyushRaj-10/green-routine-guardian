
import React from 'react';

const GrowingTree: React.FC = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-green-900 via-green-800 to-green-700 flex items-center justify-center">
      <div className="relative">
        {/* Simple tree trunk */}
        <div className="w-6 h-32 bg-amber-800 mx-auto rounded-sm"></div>
        
        {/* Simple tree foliage */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 bg-green-600 rounded-full opacity-90"></div>
          <div className="w-40 h-40 bg-green-700 rounded-full -mt-24 ml-4 opacity-80"></div>
          <div className="w-36 h-36 bg-green-500 rounded-full -mt-28 -ml-8 opacity-70"></div>
        </div>
      </div>
    </div>
  );
};

export default GrowingTree;
