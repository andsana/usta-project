import React from 'react';
import './ServiceDetailHeader.css';
import { useScreenDetector } from '../../app/hooks/useScreenDetector.ts';

interface ServiceDetailHeaderProps {
  title: string;
  preview: string;
  // image: { url: string; alt?: string };

  image: { url: string | null; alt?: string | null };
  youtube: { embed_url: string | null };
  video: { url: string | null };
}

const ServiceDetailHeader: React.FC<ServiceDetailHeaderProps> = ({
  title,
  preview,
  image,
  youtube,
  video,
}) => {
  const { isMobile } = useScreenDetector();

  return (
    <div className="serviceDetailHeader page">
      {/*<div*/}
      {/*  className="serviceDetailHeader__bgimage"*/}
      {/*  style={{ backgroundImage: `url(${image.url})` }}*/}
      {/*></div>*/}

      {/* Баннер: в мобилке картинка, на десктопе видео */}
      <div className="serviceDetailHeader__media">
        {video.url && !isMobile ? (
          <div className="serviceDetailHeader__bgvideo">
            <video autoPlay loop muted playsInline>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : image.url ? (
          <div
            className="serviceDetailHeader__bgimage"
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ) : null}
      </div>


      <div className="serviceDetailHeader__row">
        <div className="serviceDetailHeader__col">
          <div className="serviceDetailHeader__col-inner">
            <h1>{title}</h1>
            <p>{preview}</p>
          </div>
        </div>
      </div>

      {/* YouTube только для мобилок */}
      {isMobile && youtube.embed_url && (
        <div className="video-wrapper">
          <iframe
            src={youtube.embed_url.replace('watch?v=', 'embed/')}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default ServiceDetailHeader;
