'use client';

import { useMemo } from 'react';

const InfoWithForm = ({ data }) => {
  const socials = useMemo(
    () => [
      { title: 'facebook', url: data.facebook },
      { title: 'instagram', url: data.instagram },
      { title: 'youtube', url: data.youtube },
      { title: 'tiktok', url: data.TikTok },
      { title: 'twitter', url: data['Twitter/X'] },
    ],
    [data],
  );

  return (
    <div className="agent-single d-sm-flex align-items-center pb15">
      <div className="single-contant">
        <div className="agent-social">
          {socials.map((social, index) => {
            return (
              <>
                {social.url.length > 0 && (
                  <a
                    key={index}
                    target="_blank"
                    className="mr20"
                    href={social.url}
                  >
                    {<i className={`fab fa-${social.title}`} />}
                  </a>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoWithForm;
