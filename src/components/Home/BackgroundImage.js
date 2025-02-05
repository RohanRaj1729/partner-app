import React, { useState } from 'react';

const BackgroundImage = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-100 to-red-100"></div>
    // <div className="fixed inset-0 z-0">
    //     <div
    //         className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-90"
    //         style={{
    //             backgroundImage: `url('bg.jpg')`,
    //             backgroundSize: 'cover',
    //             backgroundPosition: 'center',
    //         }}
    //     />
    //     <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white opacity-90"
    //         style={{
    //             background: 'radial-gradient(circle, rgba(0, 0, 0, 0.6) 20%, rgba(0, 0, 0, 0) 70%)',
    //         }} />
    // </div>
);

export default BackgroundImage;