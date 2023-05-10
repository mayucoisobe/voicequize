export const ButtonStart = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button_start">
      <a className="btn btn-custom01">
        <span className="btn-custom01-front en fwb text-3xl">{children}</span>
      </a>
    </button>
  );
};
