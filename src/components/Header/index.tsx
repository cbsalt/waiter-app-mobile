import { CustomText } from '../CustomText';
import { Container } from './styles';

export function Header() {
  return (
    <Container>
      <CustomText size={14} opacity={0.9}>Bem-Vindo(a) ao</CustomText>
      <CustomText size={24} weight="700">
        WAITER
        <CustomText size={24}>APP</CustomText>
      </CustomText>
    </Container>
  );
}
