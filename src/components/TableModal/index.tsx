import { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { isAndroid } from '../../utils';
import { Button } from '../Button';
import { CustomText } from '../CustomText';
import { Close } from '../Icons/Close';
import { Form, Header, Input, ModalBody, Overlay } from './styles';

interface TableModalProps {
  visible: boolean;
  onClose: () => void
  onSave: (table: string) => void
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <CustomText weight='600'>
              Informe a mesa
            </CustomText>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666' />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
