export const handleCheckItem = (param: string, ...itemPart: string[]) => {
  
  return (
    itemPart.find(itemInfo => {
      return itemInfo.toLowerCase().includes(param.toLocaleLowerCase());
    })
  );
};