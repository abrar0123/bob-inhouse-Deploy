import React from 'react';
import parse from 'html-react-parser';

const OpeningHours = ({ data }) => {
  return (
    <>
      {data['Openstelling Maandag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Maandag'])}
        </div>
      )}
      {data['Openstelling Dinsdag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Dinsdag'])}
        </div>
      )}
      {data['Openstelling Woensdag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Woensdag'])}
        </div>
      )}
      {data['Openstelling Donderdag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Donderdag'])}
        </div>
      )}
      {data['Openstelling Vrijdag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Vrijdag'])}
        </div>
      )}
      {data['Openstelling Zaterdag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Zaterdag'])}
        </div>
      )}
      {data['Openstelling Zondag'] && (
        <div style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
          {parse(data['Openstelling Zondag'])}
        </div>
      )}
    </>
  );
};

export default OpeningHours;
