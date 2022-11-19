import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';

import { CustomText } from '../CustomText';
import { CheckCircle } from '../Icons/CheckCircle';

import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <StatusBar style='light' />

      <Container>
        <CheckCircle />
        <CustomText size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </CustomText>
        <CustomText color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          Seu pedido já está sendo produzido!
        </CustomText>

        <OkButton onPress={onOk}>
          <CustomText weight="600" color="#d73035">OK</CustomText>
        </OkButton>
      </Container>
    </Modal>
  );
}
