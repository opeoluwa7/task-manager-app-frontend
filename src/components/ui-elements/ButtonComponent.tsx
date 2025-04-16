

type ButtonProps = {
    buttonType: 'button' | 'submit' | 'reset';
    text: string;
    isDisabled?: boolean;
  
}

const Button = (props: ButtonProps) => {
    return (
      <button disabled={props.isDisabled} type={props.buttonType}>{props.text}</button>
    )
}

export default Button
