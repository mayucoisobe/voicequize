import useStore from '../store';
import { ReactComponent as IconUnMuted } from '../../public/images/common/icon_unMute.svg';
import { ReactComponent as IconMuted } from '../../public/images/common/icon_mute.svg';

export const VolumeControl = () => {
  const { isMuted } = useStore();
  const setIsMuted = useStore((state) => state.setIsMuted);

  return (
    <div className="my-4">
      <button onClick={() => setIsMuted(!isMuted)}>{isMuted ? <IconMuted /> : <IconUnMuted />}</button>
    </div>
  );
};
