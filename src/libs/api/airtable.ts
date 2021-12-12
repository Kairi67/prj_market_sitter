import Airtable from "airtable";

Airtable.configure({ apiKey: process.env.REACT_APP_API_KEY });
const base = Airtable.base(process.env.REACT_APP_BASE_ID);

interface updateProductParam {
  id: string;
  name: string;
  price: string;
}

interface createProductParam {
  name: string;
  price: string;
}

export default class AirtableClient {
  // 1. 商品一覧取得
  static getProductListApi() {
    return base("market-sitter").select({
      maxRecords: 50,
      view: "All applicants",

      // sort: [{ field: 'counts', direction: 'desc' }],
    });
  }
  // 2. 支払い一覧取得
  static getPaymentListApi() {
    return base("payment").select({
      maxRecords: 50,
      view: "Grid view",
      // sort: [{ field: 'counts', direction: 'desc' }],
    });
  }
  // 3. 支払い内容作成
  static postPaymentItemApi(total: number, nameArray: string[], memo: string) {
    return base("payment").create([
      {
        fields: {
          price: Number(total),
          paymentlist: nameArray.join(),
          memo: memo,
        },
      },
    ]);
  }
  // 4. 商品内容編集
  static updateProductItemApi(param: updateProductParam) {
    return base("market-sitter").update([
      {
        id: param.id,
        fields: {
          name: param.name,
          price: Number(param.price),
        },
      },
    ]);
  }
  // 5. 商品内容追加
  static postProductItemApi(param: createProductParam) {
    return base("market-sitter").create([
      {
        fields: {
          name: param.name,
          price: Number(param.price),
        },
      },
    ]);
  }
}
