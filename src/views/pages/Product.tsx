import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Typography, Space, Spin } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { TableList } from '../components/Table';
import ConfirmBillingModal from '../components/modal/ConfirmBillingModal';
import { addKey } from '../../libs/utils';
import AirtableClient from '../../libs/api/airtable';

interface ItemList {
  id: number;
  name: string;
  price: string;
  image: [];
}

interface CountList {
  name: string;
  price: string;
  count: number;
}

const ProductList: React.FC = () => {
  const [itemList, setItemList] = useState<ItemList[]>([]);
  const [countList, setCountList] = useState<CountList[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllRecords();
  }, []);

  const getAllRecords = async () => {
    try {
      setLoading(true);
      await AirtableClient.getProductListApi().eachPage((response: any) => {
        const newItemList = response.map((item: any) => item.fields);
        const newCountList = newItemList.map((item: ItemList) => ({
          name: item.name,
          price: item.price,
          count: 0,
        }));
        setItemList(newItemList);
        setCountList(newCountList);
        setLoading(false);
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: '',
      width: 300,
      render: (record: any) => (
        <img alt='product_image' src={record.image[0].url} width={120} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 500,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 300,
      render: (price: number) => <p>￥{Number(price).toLocaleString()}</p>,
    },
    {
      title: 'Count',
      dataIndex: '',
      render: (record: ItemList) => {
        return (
          countList.length > 0 && (
            <Space size='middle'>
              <MinusCircleOutlined
                style={{ fontSize: '24px' }}
                onClick={() => handleCountAction(record.name, 'minus')}
              />
              <span>
                {countList.find((item: any) => item.name === record.name).count}
              </span>
              <PlusCircleOutlined
                style={{ fontSize: '24px' }}
                onClick={() => handleCountAction(record.name, 'plus')}
              />
            </Space>
          )
        );
      },
    },
  ];

  const handleShowModalAction = () => {
    setVisible(true);
  };

  const handleClearCountAction = () => {
    const clearCountList = countList.map((item) => ({ ...item, count: 0 }));
    setCountList(clearCountList);
  };

  const handleCountAction = (targetProduct: string, key: string) => {
    const target = countList.find(({ name }) => name === targetProduct);
    if (key === 'plus') target.count += 1;
    if (key === 'minus') target.count -= target.count > 0 ? 1 : 0;
    setCountList([...countList]);
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[40, 0]} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Typography.Title level={2}>Product List</Typography.Title>
        </Col>
        <Col span={6}>
          <Button onClick={handleClearCountAction} block>
            All Clear
          </Button>
        </Col>
        <Col span={6}>
          <Button onClick={handleShowModalAction} block>
            Billing
          </Button>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          {itemList && (
            <TableList columns={columns} dataSource={addKey(itemList)} />
          )}
        </Col>
      </Row>
      {visible && (
        <ConfirmBillingModal
          setVisible={setVisible}
          countList={addKey(countList)}
        />
      )}
    </Spin>
  );
};

export default ProductList;
