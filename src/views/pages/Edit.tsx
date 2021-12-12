import React, { useEffect, useState, useRef, useContext } from "react";
import { Row, Col, Button, Typography, Spin, Form, Input } from "antd";
import { TableList } from "../components/Table";
import AddProductModal from "../components/modal/AddProductModal";
import { addKey } from "../../libs/utils";
import AirtableClient from "../../libs/api/airtable";

interface RecordDataProps {
  id: number;
  key: string;
  name: string;
  target_id: string;
  price: string;
  image: [];
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: string;
  editable: boolean;
  dataIndex: number;
  record: any;
  handleSaveAction: (value: RecordDataProps) => void;
}

const EditableContext = React.createContext(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSaveAction,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) inputRef.current!.focus();
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const updateValue = async () => {
    try {
      const values = await form.validateFields();
      const request = {
        id: record.target_id,
        name: values.name ? values.name : record.name,
        price: values.price ? values.price : record.price,
      };
      await AirtableClient.updateProductItemApi(request);
      handleSaveAction({ ...record, ...values });
    } finally {
      toggleEdit();
    }
  };

  if (editable) {
    children = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={updateValue} onBlur={updateValue} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{children}</td>;
};

const Edit: React.FC = () => {
  const [itemList, setItemList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllRecords();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
    },
  ];

  const getAllRecords = async () => {
    try {
      setLoading(true);
      await AirtableClient.getProductListApi().eachPage((response: any) => {
        const newItemList = response.map((item: any) => {
          const newRecord = item.fields;
          newRecord["target_id"] = item.id;
          return newRecord;
        });
        setItemList(newItemList);
        setLoading(false);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowModalAction = () => {
    setVisible(true);
  };

  const handleSaveAction = (row: RecordDataProps) => {
    const newData = [...itemList];
    const index = newData.findIndex((item) => row.target_id === item.target_id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setItemList(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const editColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSaveAction: handleSaveAction,
      }),
    };
  });

  return (
    <Spin spinning={loading} style={{ marginBottom: "20px" }}>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Typography.Title level={2}>Edit List</Typography.Title>
        </Col>
        <Col span={6}>
          <Button onClick={handleShowModalAction} block>
            Add Product
          </Button>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          <TableList
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={addKey(itemList)}
            columns={editColumns}
          />
        </Col>
      </Row>
      {visible && <AddProductModal setVisible={setVisible} />}
    </Spin>
  );
};

export default Edit;
