import useStore from '../store';
import { ReactComponent as IconUnMuted } from '../../public/images/common/icon_unMute.svg';
import { ReactComponent as IconMuted } from '../../public/images/common/icon_mute.svg';

export const VolumeControl = () => {
  const { isMuted } = useStore();
  const setIsMuted = useStore((state) => state.setIsMuted);

  return (
    <div className="btn-mute">
      {/* <p className="fwb pb-1 text-sm text-customBlue">おんがく</p> */}
      <div onClick={() => setIsMuted(!isMuted)}>{isMuted ? <IconMuted /> : <IconUnMuted />}</div>
    </div>
  );
};
