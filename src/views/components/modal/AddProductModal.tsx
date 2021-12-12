import React, { useState } from 'react';
import { Modal, Input, Form } from 'antd';
import AirtableClient from '../../../libs/api/airtable';

interface Props {
  setVisible: (value: boolean) => void;
}

interface viewDataProps {
  name: string;
  price: string;
}

const AddProductModal: React.FC<Props> = ({ setVisible }) => {
  const [viewData, setViewData] = useState<viewDataProps>({
    name: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const request = { name: viewData.name, price: viewData.price };
      await AirtableClient.postProductItemApi(request);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeValueAction = (key: string, value: string) => {
    setViewData({ ...viewData, [key]: value });
  };

  return (
    <Modal
      title='Add Product'
      visible={true}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      // okButtonProps={{ disabled: total === 0 }}
    >
      <Form.Item
        label='商品名'
        name='product name'
        rules={[{ required: true, message: '' }]}
      >
        <Input
          value={viewData.name}
          onChange={(event) => {
            handleChangeValueAction('name', event.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label='金額　'
        name='price'
        rules={[{ required: true, message: '' }]}
      >
        <Input
          value={viewData.price}
          onChange={(event) => {
            handleChangeValueAction('price', event.target.value);
          }}
        />
      </Form.Item>
    </Modal>
  );
};

export default AddProductModal;
