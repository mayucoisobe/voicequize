import { ReactCompoment as PlayIcon } from '../../public/images/modals/icon_play.svg';

export const ButtonSpeak = ({ styleType, text, onClick }) => {
  const styles = {
    primary: '#3e87ff',
    secondary: '#ef476f',
    tertiary: '#FFD166',
  };
  const style = styles[styleType];

  return (
    <button onClick={onClick} className="button_speak">
      <div className="flex items-center">
        <PlayIcon fill={style} className="m-w-50 mx-1" />
        <p className="text-left text-xl leading-tight text-customBlack">{text}</p>
      </div>
    </button>
  );
};
