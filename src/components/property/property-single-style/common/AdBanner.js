import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1823515369373397';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Initialize ads
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins
        class="adsbygoogle"
        style={{ display: 'block', overflow: 'hidden' }}
        data-ad-client="ca-pub-1823515369373397"
        data-ad-slot="9254430065"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
