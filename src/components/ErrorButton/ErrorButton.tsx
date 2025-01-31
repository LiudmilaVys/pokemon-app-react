import { Component } from 'react';

type ErrorButtonProps = { onError: () => void };

export default class ErrorButton extends Component<ErrorButtonProps, unknown> {
  render() {
    return (
      <div className="error-button">
        <input
          type="button"
          value="Trigger an error"
          onClick={this.props.onError}
        ></input>
      </div>
    );
  }
}
