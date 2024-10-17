import React from 'react';

const CustomMapMarker = ({ title, windowWidth }: { title: string; windowWidth: number }) => {
  const imageUrl = 'https://ifh.cc/g/D9XDvO.png'; // 제공된 이미지 URL

  const contentArray = [
    '<div style="margin: 0; display: table; padding: 0.5rem; table-layout: auto; border-radius: 2.3rem; border: 0.2rem solid var(--color--darkgreen); background: white; cursor: pointer; position: relative; z-index: 2">',
    `<div style="display: table-cell; display: inline-block; width: 2.5rem; height: 2.5rem; background-image: url(${imageUrl}); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>`,
    '<span style="position: absolute; border-style: solid; border-width: 1rem 1rem 0 1rem; border-color: #ffffff transparent; display: block; width: 0; z-index: 1; top: 3.1rem; left: 0.75rem;"></span>',
    '<span style="position: absolute; border-style: solid; border-width: 1rem 1rem 0 1rem; border-color: rgba(0, 0, 0, 0) transparent; display: block; width: 0; z-index: 0; top: 3.35rem; left: 0.75rem;"></span>',
    '</div>',
  ];

  return contentArray.join('');
};

export default CustomMapMarker;
