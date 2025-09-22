import React from 'react';

export default function Score({ value }: { value: number }) {
  return (
    <div className="text-xl font-bold text-center mt-4">
      Score: {value}
    </div>
  );
}