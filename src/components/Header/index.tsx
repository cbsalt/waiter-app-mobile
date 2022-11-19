import { TouchableOpacity } from 'react-native';

import { CustomText } from '../CustomText';

import { Container, OrderContent, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <CustomText size={14} opacity={0.9}>Bem-Vindo(a) ao</CustomText>
          <CustomText size={24} weight="700">
            WAITER
            <CustomText size={24}>APP</CustomText>
          </CustomText>
        </>
      )}

      {selectedTable && (
        <OrderContent>
          <OrderHeader>
            <CustomText size={24} weight="600">Pedido</CustomText>
            <TouchableOpacity onPress={onCancelOrder}>
              <CustomText color='#d73035' weight='600' size={14}>
              cancelar pedido
              </CustomText>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <CustomText color='#666'>
              Mesa {selectedTable}
            </CustomText>
          </Table>
        </OrderContent>
      )}
    </Container>
  );
}
