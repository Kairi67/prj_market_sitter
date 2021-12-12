export const addKey = (data: any) => {
  if (!data) return data;
  data.forEach((element: any, index: number) => {
    element.key = `#${index}`;
  });
  return data;
};
