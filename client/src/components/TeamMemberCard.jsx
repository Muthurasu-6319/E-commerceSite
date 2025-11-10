import React from 'react';
import placeholder from '../assets/images/profile.jpeg'; 

const TeamMemberCard = ({ name, role, image }) => {
  return (
    <div className="group text-center">
      <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
        <img 
          src={image || placeholder} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <h3 className="text-xl font-bold text-text-header">{name}</h3>
      <p className="text-primary font-semibold">{role}</p>
    </div>
  );
};

export default TeamMemberCard;