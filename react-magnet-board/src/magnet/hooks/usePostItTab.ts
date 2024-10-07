import { useContext, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';

import { HEADER_CONTAINER_PREFIX_ID, TAB_MIN_WIDTH } from '@components/magnet/constants';
import { TAB_CONTAINER_PREFIX_ID } from '@components/magnet/constants';
import { PostItTabContext } from '@components/magnet/context/PostItTabContext';
import type { IBound, IPostIt, ITabItem } from '@components/magnet/types';
import { isElementContainMousePos, isElementsOverlap } from '@libs/element';

const usePostItTab = (
  activePostItId: string,
  active: boolean,
  postIt: IPostIt,
  postItList: IPostIt[],
  setActivePostItId: (id: string) => void,
  onChangePostItList: (postItList: IPostIt[]) => void,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const { overlapPostItId, setOverlapPostItId, syncIsEditingId, tabWidth } = useContext(PostItTabContext);
  const getTabItems = (activeTabId: string) => {
    return [...postItList]
      .sort((a, b) => a.tabLeft - b.tabLeft)
      .filter((item) => item.activeTabId === activeTabId)
      .map((item) => {
        return {
          id: item.id,
          value: item.type,
          label: item.title,
          left: item.tabLeft,
          width: item.tabWidth,
        } as ITabItem;
      });
  };

  // 다른탭 클릭시 isEditing값 동기화
  useEffect(() => {
    if (syncIsEditingId && syncIsEditingId === postIt.id) {
      setIsEditing(true);
    }
  }, [syncIsEditingId]);

  // mouseUp시점(=isEditing이 false)에 overlap 상황이면 postIt 탭 합침
  useEffect(() => {
    if (!isEditing && active && overlapPostItId !== '') {
      onMouseUpUpdateOverlap();
    }
  }, [overlapPostItId, isEditing, active]);

  const getOrderPostItList = (postItList: IPostIt[], activePostItId: string, isRemoved: boolean = false) => {
    return [...postItList]
      .sort((a, b) => a.order - b.order)
      .map((item, index) => {
        if (item.id === activePostItId) {
          return {
            ...item,
            order: isRemoved ? postItList.length : postItList.length - 1,
          };
        }
        return { ...item, order: index };
      });
  };

  const onUpdateTabWidth = (bound: IBound) => {
    const tabItems = getTabItems(postIt.activeTabId);
    const toBeUpdatedTabItems = getLatestTabItems(tabItems, postIt.activeTabId);
    if (tabItems === toBeUpdatedTabItems) {
      return;
    }
    onUpdateTabItems(toBeUpdatedTabItems, bound);
  };

  const onMouseMoveUpdateOverlap = (id: string, clientX: number, clientY: number) => {
    const currentElement = document.getElementById(HEADER_CONTAINER_PREFIX_ID + id);
    for (let i = 0; i < postItList.length; i++) {
      if (postItList[i].activeTabId === id) {
        continue;
      }
      const otherElement = document.getElementById(HEADER_CONTAINER_PREFIX_ID + postItList[i].id);
      if (isElementsOverlap(currentElement, otherElement) && isElementContainMousePos(clientX, clientY, otherElement)) {
        const newOverlapId = postItList[i].id;
        setOverlapPostItId(newOverlapId);
        return;
      }
    }
    setOverlapPostItId('');
  };

  const getLatestTabItems = (tabItems: ITabItem[], targetTabId: string, isNotCheckEqualTabWidth: boolean = false) => {
    const containerElement = document.getElementById(TAB_CONTAINER_PREFIX_ID + targetTabId);
    if (!containerElement) {
      return tabItems;
    }
    const containerWidth = containerElement.clientWidth;
    const width = Math.floor(containerWidth / tabItems.length);
    const currentTabWidth = tabItems[0].width || tabWidth;
    const newTabWidth = width > tabWidth ? tabWidth : width < TAB_MIN_WIDTH ? TAB_MIN_WIDTH : width;

    if (currentTabWidth === newTabWidth && !isNotCheckEqualTabWidth) {
      return tabItems;
    }
    return tabItems.map((tabItem, index) => ({ ...tabItem, width: newTabWidth, left: index * newTabWidth }));
  };

  const onMouseUpUpdateOverlap = () => {
    const targetPostIt = postItList.find((item) => item.id === overlapPostItId);
    if (!targetPostIt) {
      return;
    }
    const newTabItems = getLatestTabItems(
      [...getTabItems(targetPostIt.id), ...getTabItems(postIt.activeTabId)],
      targetPostIt.activeTabId,
      true,
    );
    const newPostItList = postItList.filter((item) => newTabItems.every((tabItem) => tabItem.id !== item.id));
    const toBeUpdatedPostItList: IPostIt[] = [];
    newTabItems.forEach((tabItem) => {
      const findPostIt = postItList.find((item) => item.id === tabItem.id);
      if (!findPostIt) {
        return;
      }
      toBeUpdatedPostItList.push({
        left: targetPostIt.left,
        top: targetPostIt.top,
        width: targetPostIt.width,
        height: targetPostIt.height,
        id: tabItem.id,
        title: findPostIt.title,
        type: findPostIt.type,
        activeTabId: postIt.activeTabId,
        order: findPostIt.order,
        tabWidth: tabItem.width,
        tabLeft: tabItem.left,
      });
    });
    if (toBeUpdatedPostItList.length !== newTabItems.length) {
      return;
    }
    setOverlapPostItId('');
    onChangePostItList([...newPostItList, ...toBeUpdatedPostItList]);
    setActivePostItId(postIt.activeTabId);
  };

  const onUpdateActivePostItId = (tabId: string) => {
    if (tabId === activePostItId) {
      return;
    }
    setActivePostItId(tabId);
  };

  const onChangeTabId = (tabId: string) => {
    const newPostItList = postItList.filter((item) => item.activeTabId !== postIt.activeTabId);
    const toBeUpdatedPostItList: IPostIt[] = [];
    getTabItems(postIt.activeTabId).forEach((tabItem, index) => {
      const findPostIt = postItList.find((item) => item.id === tabItem.id);
      if (!findPostIt) {
        return;
      }
      toBeUpdatedPostItList.push({
        ...findPostIt,
        activeTabId: tabId,
        order: tabId === tabItem.id ? postItList.length : newPostItList.length + index,
      });
    });
    onChangePostItList(getOrderPostItList([...newPostItList, ...toBeUpdatedPostItList], tabId));
  };

  const onUpdateTabItems = (tabItems: ITabItem[], bound?: IBound) => {
    const items = postItList.filter((item) => item.activeTabId !== postIt.activeTabId);
    const toBeUpdatedItems: IPostIt[] = [];
    tabItems.forEach((item) => {
      const findPostIt = postItList.find((pt) => pt.id === item.id);
      if (!findPostIt) {
        return;
      }
      const commonPostIt = {
        ...findPostIt,
        tabLeft: item.left,
        tabWidth: item.width,
      };
      const newPostIt = bound
        ? {
            ...commonPostIt,
            ...bound,
          }
        : commonPostIt;
      toBeUpdatedItems.push(newPostIt);
    });
    onChangePostItList([...items, ...toBeUpdatedItems]);
  };

  const onRemoveTabItem = (tabId: string) => {
    const targetPostIt = postItList.find((item) => item.id === tabId);
    if (!targetPostIt) {
      return;
    }
    const items = postItList.filter((item) => item.id !== postIt.id);
    const currentTabItems = getTabItems(targetPostIt.activeTabId);
    if (currentTabItems.length === 1) {
      onChangePostItList(items);
      return;
    }
    const postItTabItems = getLatestTabItems(
      currentTabItems.filter((tabItem) => tabItem.id !== tabId),
      postIt.activeTabId,
      true,
    );
    const newActiveTabId =
      tabId === postIt.activeTabId ? postItTabItems[postItTabItems.length - 1].id : postIt.activeTabId;
    const toBeUpdatedPostItList: IPostIt[] = [];
    postItTabItems.forEach((tabItem) => {
      const postIt = postItList.find((item) => item.id === tabItem.id);
      if (!postIt) {
        return;
      }
      const newPostIt = {
        ...postIt,
        activeTabId: newActiveTabId,
        tabLeft: tabItem.left,
        tabWidth: tabItem.width,
      };
      toBeUpdatedPostItList.push(newPostIt);
    });
    const newPostItList = [
      ...postItList.filter((item) => item.activeTabId !== targetPostIt.activeTabId),
      ...toBeUpdatedPostItList,
    ];
    onChangePostItList(getOrderPostItList(newPostItList, newActiveTabId, true));
    setActivePostItId(newActiveTabId);
  };

  const onDivideTabItem = (id: string, clientY: number, mouseDownY: number) => {
    const currentTabItems = getTabItems(postIt.activeTabId);
    if (currentTabItems.length === 1) {
      return;
    }
    const postItTabItems = getLatestTabItems(
      currentTabItems.filter((tabItem) => tabItem.id !== id),
      postIt.activeTabId,
      true,
    );
    const toBeUpdatedCurrentItems: IPostIt[] = [];
    postItTabItems.forEach((tabItem) => {
      const findPostIt = postItList.find((item) => item.id === tabItem.id);
      if (!findPostIt) {
        return;
      }
      const newPostIt = {
        ...findPostIt,
        activeTabId: postItTabItems[postItTabItems.length - 1].id,
        tabLeft: tabItem.left,
        tabWidth: tabItem.width,
      };
      toBeUpdatedCurrentItems.push(newPostIt);
    });
    const targetPostIt = {
      id: postIt.id,
      type: postIt.type,
      title: postIt.title,
      left: postIt.left + 30,
      top: postIt.top - (mouseDownY - clientY),
      width: postIt.width,
      height: postIt.height,
      order: postIt.order,
      activeTabId: postIt.id,
      tabLeft: 0,
      tabWidth,
    };
    const items = postItList.filter((item) => item.activeTabId !== postIt.activeTabId);
    const newPostItList = [...items, ...toBeUpdatedCurrentItems, targetPostIt];
    onChangePostItList(getOrderPostItList(newPostItList, postIt.id));
    setActivePostItId(postIt.id);
  };
  const isTargetOverlap = !active && overlapPostItId === postIt.id;
  const isCurrentOverlap = active && overlapPostItId !== '';

  return {
    isEditing,
    tabItems: getTabItems(postIt.activeTabId),
    isTargetOverlap,
    isCurrentOverlap,
    onChangeIsEditing: setIsEditing,
    onChangeTabId,
    onUpdateActivePostItId,
    onUpdateTabItems,
    onRemoveTabItem,
    onDivideTabItem,
    onMouseMoveUpdateOverlap,
    onUpdateTabWidth: debounce((bound: IBound) => onUpdateTabWidth(bound), 150),
  };
};

export default usePostItTab;
