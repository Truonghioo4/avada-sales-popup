import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  productUrl = '#',
  position = 'bottom-left',
  mobile_position = 'bottom',
  hideTimeAgo = false,
  truncateProductName = false
}) => {
  return (
    <div
      className={`Avava-SP__Wrapper fadeInUp animated Avava-SP__DesktopPosition--${position} 
        Avava-SP-MobilePosition--${mobile_position}`}
    >
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href={productUrl} className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncateProductName ? 'truncate-text' : ''}`}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <span className="Avada-SP__Timestamp">{!hideTimeAgo && timestamp} </span>
                <span className="uni-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width="12px"
                    height="12px"
                  >
                    <path
                      fill="#2196f3"
                      d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                    />
                  </svg>{' '}
                  by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.string,
  productImage: PropTypes.string,
  productUrl: PropTypes.string,
  position: PropTypes.string,
  mobile_position: PropTypes.string,
  isShowOnMobile: PropTypes.bool,
  hideTimeAgo: PropTypes.bool,
  truncateProductName: PropTypes.bool
};

export default NotificationPopup;
