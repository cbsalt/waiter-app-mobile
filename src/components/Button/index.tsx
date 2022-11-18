import { CustomText } from '../CustomText';
import { Container } from './styles';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ children, onPress, disabled }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <CustomText weight="600" color="#fff">
        {children}
      </CustomText>
    </Container>
  );
}
