import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div id="preloader">
      <div id="building">
        <div id="blocks">
          <div className="b" id="b1"></div>
          <div className="b" id="b2"></div>
          <div className="b" id="b3"></div>
          <div className="b" id="b4"></div>
        </div>
        <div id="caption">Process is almost ready...</div>
      </div>
    </div>
  );
};

export default Loader;
