interface ICustomBtn {
  classNames?: string;
  btnText: string;
  onHandleClick?: () => void;
}

function CustomButton(props: ICustomBtn) {
  const { classNames, btnText, onHandleClick } = props;
  return (
    <button className={`btn ${classNames}`} onClick={onHandleClick}>
      {btnText}
    </button>
  );
}

export default CustomButton;
