import type { IBound, IPostIt } from '@components/magnet/types';

const usePostIt = (
  postIt: IPostIt,
  postItList: IPostIt[],
  onChangePostItList: (postItList: IPostIt[]) => void,
  setActivePostItId: (id: string) => void,
) => {
  const getUpdatedOrderPostItList = (postItList: IPostIt[], id: string) => {
    const activePostIt = postItList.find((item) => item.id === id);
    if (!activePostIt) {
      return postItList;
    }
    const activePostItOrder = activePostIt.order;
    return postItList.map((item) => {
      if (item.order < activePostItOrder) {
        return item;
      }
      if (item.id === id) {
        return { ...item, order: postItList.length - 1 };
      }
      return { ...item, order: item.order - 1 };
    });
  };

  const onUpdatePostItBound = (bound: IBound) => {
    const items = postItList.filter((item) => item.activeTabId !== postIt.activeTabId);
    const newItems = postItList
      .filter((item) => item.activeTabId === postIt.activeTabId)
      .map((item) => ({ ...item, ...bound }));
    onChangePostItList(getUpdatedOrderPostItList([...items, ...newItems], postIt.id));
    setActivePostItId(postIt.id);
  };

  const onUpdateActiveId = (id: string) => {
    onChangePostItList(getUpdatedOrderPostItList(postItList, postIt.id));
    setActivePostItId(id);
  };

  const onDeleteItem = (postIt: IPostIt) =>
    onChangePostItList(
      postItList
        .filter((item) => item.activeTabId !== postIt.activeTabId)
        .map((item) => (item.order > postIt.order ? { ...item, order: item.order - 1 } : item)),
    );

  return {
    onDeleteItem,
    onUpdateActiveId,
    onUpdatePostItBound,
  };
};

export default usePostIt;
