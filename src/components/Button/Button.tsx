import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

const Button = ({ children, type = 'button', onClick }: ButtonProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
