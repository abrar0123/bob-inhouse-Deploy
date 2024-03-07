import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const PropertyAddress = ({ data }) => {
  const address = `${data.Straatnaam} ${data.Straatnummer} ${data.Postcode} ${data.Plaatsnaam}`;

  return (
    <>
      <div className={`col-12`}>
        <div
          className="d-grid justify-content-between"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Address</p>
            <p className="fw600 mb10 ff-heading dark-color">Phone</p>
            <p className="fw600 mb10 ff-heading dark-color">Email</p>
            <p className="fw600 mb-0 ff-heading dark-color">URL</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{address}</p>
            <a
              style={{ display: 'block' }}
              href={`tel:${data['Telefoon']}`}
              className="text mb10"
            >
              {data['Telefoon']}
            </a>
            <a style={{ display: 'block' }} className="text mb10">
              {data['E-mailadres']}
            </a>
            <CopyToClipboard
              text={`${window.location.origin}/${data.Slug}`}
              onCopy={() => toast.success('URL copied to clipboard!')}
            >
              <span
                className="text mb10"
                style={{ cursor: 'pointer' }}
              >{`${window.location.origin}/${data.Slug}`}</span>
            </CopyToClipboard>
          </div>
        </div>
      </div>

      {/* End col */}

      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${data.Naam} ${address}&t=m&z=14&output=embed&iwloc=near`}
          title={data.Naam}
          aria-label={data.Naam}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
