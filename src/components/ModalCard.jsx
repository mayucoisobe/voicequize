import styles from '../styles/Modal.module.css';

export const ModalCard = ({ styleType, show, setShow, children }) => {
  const { overlay, content, customBlue, customRed, customYellow, customBlack } = styles;
  const colors = {
    primary: `${content} ${customBlue}`,
    secondary: `${content} ${customRed}`,
    tertiary: `${content} ${customYellow}`,
    quaternary: `${content} ${customBlack}`,
  };

  const svgColors = {
    primary: '#3e87ff',
    secondary: '#ef476f',
  };

  const style = colors[styleType] || content;
  const svgStyle = svgColors[styleType];

  const closeModal = () => {
    setShow(false);
  };

  console.log(style);
  console.log(svgStyle);

  if (show) {
    return (
      <>
        <div className={overlay} onClick={closeModal}>
          <div
            className={`${style} relative animate-scale-in-center`}
            onClick={(e) => e.stopPropagation()}
            // className={`${style} ${show ? 'animate-scale-in-center' : 'animate-scale-in-centerClose'}`}
            // className={`${style} ${
            //   show ? 'animate-scale-in-center' : 'animate-scale-out-center'
            // }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill={svgStyle}
              className="bi bi-x-circle-fill absolute top-4 right-4 cursor-pointer"
              viewBox="0 0 16 16"
              onClick={closeModal}
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
            {children}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
