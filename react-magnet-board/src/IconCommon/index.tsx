interface IProps {
  size?: number;
  fillColor?: string;
  type: string;
}

const IconCommon: React.FC<IProps> = ({ type, size = 18, fillColor }) => {
  if (type === 'info') {
    return (
      <svg fill="none" height={size} viewBox="0 0 28 28" width={size} xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" fill={fillColor || '#FFD925'} r="14" />
        <path
          d="M12.9317 16.4966L12.4445 7H15.8009L15.2956 16.4966H12.9317ZM14.1227 21.2653C13.6655 21.2653 13.2685 21.1029 12.9317 20.7781C12.6069 20.4413 12.4445 20.0443 12.4445 19.5871C12.4445 19.13 12.6069 18.739 12.9317 18.4142C13.2685 18.0773 13.6655 17.9089 14.1227 17.9089C14.5798 17.9089 14.9708 18.0773 15.2956 18.4142C15.6325 18.739 15.8009 19.13 15.8009 19.5871C15.8009 20.0443 15.6325 20.4413 15.2956 20.7781C14.9708 21.1029 14.5798 21.2653 14.1227 21.2653Z"
          fill="#0D0D0E"
        />
      </svg>
    );
  }

  if (type === 'question') {
    return (
      <svg fill="none" height="16" viewBox="0 0 32 32" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.4612 18.4977H16.9896C16.6956 15.7341 20.106 14.8129 20.106 12.0297C20.106 9.50133 18.3812 8.28613 16.0096 8.28613C14.3044 8.28613 12.9128 9.08973 11.8936 10.2461L13.4812 11.7161C14.128 11.0497 14.814 10.6185 15.6764 10.6185C16.6956 10.6185 17.3424 11.2261 17.3424 12.2257C17.3424 14.0877 13.9908 15.3421 14.4612 18.4977ZM15.7352 23.7113C16.7544 23.7113 17.5384 22.9077 17.5384 21.8297C17.5384 20.7517 16.7544 19.9677 15.7352 19.9677C14.6964 19.9677 13.9516 20.7517 13.9516 21.8297C13.9516 22.9077 14.6964 23.7113 15.7352 23.7113Z"
          fill="#808080"
        />
        <path
          d="M29.5 16C29.5 23.4558 23.4558 29.5 16 29.5C8.54416 29.5 2.5 23.4558 2.5 16C2.5 8.54416 8.54416 2.5 16 2.5C23.4558 2.5 29.5 8.54416 29.5 16Z"
          stroke="#808080"
        />
      </svg>
    );
  }

  if (type === 'new') {
    return (
      <svg fill="none" height={size} viewBox="0 0 16 16" width={size} xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" fill="#FFD925" r="8" />
        <path
          d="M4.95929 11.4223V4.57785H6.30862L9.71129 8.99741V4.57785H11.0411V11.4223H9.78951L6.29885 6.8463V11.4223H4.95929Z"
          fill="#0D0D0E"
        />
      </svg>
    );
  }

  if (type === 'link') {
    return (
      <svg fill="none" height="7" viewBox="0 0 6 7" width="6" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1H5.5M5.5 1V5M5.5 1L1 6" stroke="#CECED1" />
      </svg>
    );
  }

  if (type === 'rise') {
    return (
      <svg fill="none" height={size} viewBox="0 0 20 20" width={size} xmlns="http://www.w3.org/2000/svg">
        <rect fill="#303030" height="20" rx="3" width="20" />
        <path
          d="M13.2 5L15.032 6.90833L11.128 10.975L7.928 7.64167L2 13.825L3.128 15L7.928 10L11.128 13.3333L16.168 8.09167L18 10V5H13.2Z"
          fill="#F32A2A"
        />
      </svg>
    );
  }

  if (type === 'decline') {
    return (
      <svg fill="none" height={size} viewBox="0 0 20 20" width={size} xmlns="http://www.w3.org/2000/svg">
        <rect fill="#303030" height="20" rx="3" width="20" />
        <path
          d="M13.2 15L15.032 13.0917L11.128 9.025L7.928 12.3583L2 6.175L3.128 5L7.928 10L11.128 6.66667L16.168 11.9083L18 10V15H13.2Z"
          fill="#1260F8"
        />
      </svg>
    );
  }

  if (type === 'speaker') {
    return (
      <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" fill="#222534" r="12" />
        <path d="M6 9.84603V13.846H8.66667L12 17.1794V6.5127L8.66667 9.84603H6Z" fill="#CECED1" />
        <path
          clipRule="evenodd"
          d="M16.6234 10.8654C16.3022 9.71291 15.4694 8.86845 15.0867 8.51979L15.9847 7.53418C16.4161 7.92728 17.4828 8.98243 17.9078 10.5074C18.3522 12.1022 18.0578 14.0709 16.0104 16.1475L15.0609 15.2114C16.8125 13.4348 16.9251 11.9481 16.6234 10.8654ZM14.3447 11.624C14.2367 11.0441 13.8495 10.5088 13.5131 10.2023L14.411 9.2167C14.8887 9.65194 15.4786 10.4301 15.6555 11.3798C15.8442 12.3926 15.5426 13.5063 14.3854 14.4576L13.5387 13.4276C14.3355 12.7726 14.441 12.1407 14.3447 11.624Z"
          fill="#CECED1"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  if (type === 'new-box') {
    return (
      <svg fill="none" height={size} viewBox="0 0 16 16" width={size} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.125 2.375C0.125 1.13236 1.13236 0.125 2.375 0.125H13.625C14.8676 0.125 15.875 1.13236 15.875 2.375V13.625C15.875 14.8676 14.8676 15.875 13.625 15.875H2.375C1.13236 15.875 0.125 14.8676 0.125 13.625V2.375Z"
          fill="#FFD925"
        />
        <path
          d="M5.1875 11.375H6.64963V7.05743H6.73058L10.1102 11.375H11.375V4.625H9.91287V8.92386H9.83192L6.46244 4.625H5.1875V11.375Z"
          fill="#0D0D0E"
        />
      </svg>
    );
  }

  if (type === 'close') {
    return (
      <svg fill="none" height={size} viewBox="0 0 18 18" width={size} xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L17 17M17 1L1 17" stroke={fillColor || '#FFD925'} strokeWidth={2} />
      </svg>
    );
  }

  if (type === 'arrowDown') {
    return (
      <svg fill="none" height={size} viewBox="0 0 10 6" width={size} xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke={fillColor || '#AEC1DB'} />
      </svg>
    );
  }

  if (type === 'arrowUp') {
    return (
      <svg
        fill="none"
        height={size}
        transform="scale(1 -1)"
        viewBox="0 0 10 6"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5 5L9 1" stroke={fillColor || '#AEC1DB'} />
      </svg>
    );
  }

  if (type === 'circlePlus') {
    return (
      <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7.5" stroke="#0D0D0E" />
        <mask fill="white" id="path-2-inside-1_900_15403">
          <path d="M4.5 7.5H11.5V8.5H4.5V7.5Z" />
          <path d="M8.5 4.5L8.5 11.5H7.5L7.5 4.5H8.5Z" />
        </mask>
        <path
          d="M4.5 7.5V6.5H3.5V7.5H4.5ZM11.5 7.5H12.5V6.5H11.5V7.5ZM11.5 8.5V9.5H12.5V8.5H11.5ZM4.5 8.5H3.5V9.5H4.5V8.5ZM8.5 4.5L9.5 4.5V3.5H8.5V4.5ZM8.5 11.5V12.5H9.5V11.5H8.5ZM7.5 11.5H6.5L6.5 12.5H7.5V11.5ZM7.5 4.5V3.5H6.5V4.5L7.5 4.5ZM4.5 8.5H11.5V6.5H4.5V8.5ZM10.5 7.5V8.5H12.5V7.5H10.5ZM11.5 7.5H4.5V9.5H11.5V7.5ZM5.5 8.5V7.5H3.5V8.5H5.5ZM7.5 4.5L7.5 11.5H9.5L9.5 4.5L7.5 4.5ZM8.5 10.5H7.5V12.5H8.5V10.5ZM8.5 11.5L8.5 4.5L6.5 4.5L6.5 11.5H8.5ZM7.5 5.5H8.5V3.5H7.5V5.5Z"
          fill="#0D0D0E"
          mask="url(#path-2-inside-1_900_15403)"
        />
      </svg>
    );
  }

  if (type === 'circleMinus') {
    return (
      <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7.5" stroke="#EEEEEE" />
        <mask fill="white" id="path-2-inside-1_900_15981">
          <path d="M4.5 7.5H11.5V8.5H4.5V7.5Z" />
        </mask>
        <path
          d="M4.5 7.5V6.5H3.5V7.5H4.5ZM11.5 7.5H12.5V6.5H11.5V7.5ZM11.5 8.5V9.5H12.5V8.5H11.5ZM4.5 8.5H3.5V9.5H4.5V8.5ZM4.5 8.5H11.5V6.5H4.5V8.5ZM10.5 7.5V8.5H12.5V7.5H10.5ZM11.5 7.5H4.5V9.5H11.5V7.5ZM5.5 8.5V7.5H3.5V8.5H5.5Z"
          fill="#EEEEEE"
          mask="url(#path-2-inside-1_900_15981)"
        />
      </svg>
    );
  }

  if (type === 'check') {
    return (
      <svg fill="none" height="10" viewBox="0 0 16 10" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.25 4.25L6.25 9.25L14.75 0.75" stroke="white" />
      </svg>
    );
  }

  if (type === 'edit') {
    return (
      <svg fill="none" height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2H1V9H8V6M4 6L9 1" stroke="white" />
      </svg>
    );
  }

  if (type === 'shadowTitleDot') {
    return (
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_824_12995)">
          <rect fill={fillColor || '#ADADAD'} height="8" rx="4" width="8" x="8" y="8" />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="24"
            id="filter0_d_824_12995"
            width="24"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.678431 0 0 0 0 0.678431 0 0 0 0.8 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_824_12995" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_824_12995" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    );
  }

  return <></>;
};

export default IconCommon;
