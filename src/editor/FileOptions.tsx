import { Modal, ModalProps } from '@mantine/core'

import { Binding } from '../components/Binding'

export const FileOptions = (props: ModalProps) => (
  <Modal title="File options" centered {...props}>
    <Binding binding="S" desc="Save file" />
    <Binding binding="D" desc="Save as bmap.txt" />
    <Binding binding="X" desc="Import map from JSON" />
  </Modal>
)
