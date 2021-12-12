export const paymentColumn = [
  {
    title: 'Order',
    dataIndex: 'key',
    width: 50,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 200,
    render: (price: number) => <p>￥{Number(price).toLocaleString()}</p>,
  },
  {
    title: 'Payment List',
    dataIndex: 'paymentlist',
    width: 200,
    render: (item: string[]) => {
      return <p>{item}</p>;
    },
  },
  {
    title: 'Memo',
    dataIndex: 'memo',
    width: 200,
  },
];
