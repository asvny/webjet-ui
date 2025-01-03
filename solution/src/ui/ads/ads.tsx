import adsImage from "./assets/ads.png";

interface AdsProps {
  className?: string;
}

export function Ads(props: AdsProps) {
  const { className } = props;

  return (
    <aside className={className}>
      {/* Actual ads link can be put here */}
      <a href="https://www.webjet.com.au/" target="_blank" rel="noopener">
        <img
          src={adsImage}
          // a11y:  Descriptive alt text for screen readers
          alt="27 day Grand Scandinavia tour with baltics cruises and flights - $6999"
        />
      </a>
    </aside>
  );
}
