import styled from 'styled-components';
import { Table } from 'antd';

export const TableList = styled(Table)`
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 10px 10px;
    font-size: 18px;
  }
  .ant-table-tbody > tr.ant-table-expanded-row {
    > td {
      padding: 0;
    }
  }
  .ant-table-column-sorters {
    padding: 0;
  }
  .ant-table-tbody > tr > td > .ant-table-wrapper:only-child .ant-table {
    margin: 0;
  }
`;

// 子スタイル
export const ChildTable = styled(Table)`
  background-color: #ccc;
  .ant-table {
    font-size: 90%;
  }
  .ant-spin-container {
    /* padding: 24px 22px 20px 22px; */
    padding: 10px;
    background-color: #ccc;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 72px;
      top: 5px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 14px 8px;
      border-color: transparent transparent #fafafa transparent;
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 8px 10px;
  }
  .ant-table-content {
    overflow: auto !important;
  }
`;
