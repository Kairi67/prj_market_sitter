import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import AirtableClient from '../../../libs/api/airtable';

interface CountListProps {
  price: string;
  count: number;
  name: string;
}

interface Props {
  countList: CountListProps[];
  setVisible: (value: boolean) => void;
}

const ModalConfirmBilling: React.FC<Props> = ({ countList, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMemo, setPaymentMemo] = useState('');

  const total = countList.reduce((sums, item) => {
    return sums + Number(item.price) * item.count;
  }, 0);

  const handleOk = async () => {
    const nameArray = countList.flatMap(({ name, count }) =>
      count > 0 ? name : null
    );
    try {
      setLoading(true);
      await AirtableClient.postPaymentItemApi(total, nameArray, paymentMemo);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeMemoAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMemo(e.target.value);
  };

  return (
    <Modal
      title='お会計'
      visible={true}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      okButtonProps={{ disabled: total === 0 }}
    >
      {countList.map((item, index) => {
        const sum = Number(item.price) * item.count;
        return (
          item.count > 0 && (
            <div key={`key_${index}`}>
              <p>{`${item.name} - ${item.count}点`}</p>
              <p>{`${sum}円`}</p>
            </div>
          )
        );
      })}
      <p>{`合計 ${total}円`}</p>
      <Input placeholder='メモ' onChange={handleChangeMemoAction} />
    </Modal>
  );
};

export default ModalConfirmBilling;
