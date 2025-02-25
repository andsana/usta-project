import React from 'react';
import './ServiceDetailHeader.css';

interface ServiceDetailHeaderProps {
  title: string;
  preview: string;
  image: { url: string; alt?: string };
}

const ServiceDetailHeader: React.FC<ServiceDetailHeaderProps> = ({
  title,
  preview,
  image,
}) => {
  return (
    <div className="serviceDetailHeader">
      <div className="serviceDetailHeader__bgimage-wrapper">
        <div
          className="serviceDetailHeader__bgimage"
          style={{ backgroundImage: `url(${image.url})` }}
        ></div>

        <div className="serviceDetailHeader__row">
          <div className="serviceDetailHeader__col">
            <div className="serviceDetailHeader__col-inner">
              <h1>{title}</h1>
              <p>{preview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailHeader;
