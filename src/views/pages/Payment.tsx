import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import AirtableClient from '../../libs/api/airtable';
import { addKey } from '../../libs/utils';
import { TableList } from '../components/Table';
import { paymentColumn } from '../../constants/column';

const PaymentList: React.FC = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllRecords();
  }, []);

  const getAllRecords = async () => {
    try {
      setLoading(true);
      await AirtableClient.getPaymentListApi().eachPage((response: any) => {
        const records = response.map((item: any) => {
          return item.fields;
        });
        setPaymentList(records);
        setLoading(false);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Typography.Title level={2}>Payment List</Typography.Title>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          {paymentList && (
            <TableList
              columns={paymentColumn}
              dataSource={addKey(paymentList)}
            />
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default PaymentList;
