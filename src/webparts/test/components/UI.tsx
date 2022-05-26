import * as React from 'react';
export default function UI({displayName, mail, jobTitle}) {
  return (
    <div className='container pt-4 flex justify-center items-center'>
      <div className="rounded overflow-hidden shadow-lg p-4">
        {/*TODO: add user images here/*}
  {/* <img className="w-full" src="" alt="user images" ></img> */}
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{displayName}</div>
  </div>
  <div className="px-6 py-4">
  <p className="text-gray-700 text-base">{mail}</p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{jobTitle ? `${jobTitle}` : 'Developer'}</span>
  </div>
</div>
    </div>
  );
}
