export const Button = ({ styleType, text, onClick }) => {
  const baseStyle = 'button_base'; // global.cssで定義
  const styles = {
    primary: `${baseStyle} bg-customBlue`,
    secondary: `${baseStyle} bg-customRed`,
    tertiary: `${baseStyle} bg-customYellow`,
    quaternary: `${baseStyle} bg-customBlack`,
  };
  const style = styles[styleType] || baseStyle;

  return (
    <button onClick={onClick} className={style}>
      <p className="text-2xl text-white xs:text-3xl">{text}</p>
    </button>
  );
};
