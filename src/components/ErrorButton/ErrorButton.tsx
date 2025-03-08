type ErrorButtonProps = { onError: () => void };

const ErrorButton = ({ onError }: ErrorButtonProps) => {
  return (
    <div className="error-button">
      <input type="button" value="Trigger an error" onClick={onError}></input>
    </div>
  );
};

export default ErrorButton;
