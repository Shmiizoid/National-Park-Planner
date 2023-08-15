import React from 'react';
import Card from '../Card';

export default function Gallery({ parks, updateDetails }) {
  let galleryContent = (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-900"></div>
    </div>
  );

  if (parks.length > 0) {
    galleryContent = parks.map((park) => (
      <Card key={park.id} parkData={park} updateDetails={updateDetails} />
    ));
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {galleryContent}
    </div>
  );
}