// Docs 에서는 postIt 아래 이동시 마우스 클릭 영역 이상하게 잡힘, Default에서는 제대로 작동(style.css.ts 적용)
import { type FC, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import MagnetBoard from '@components/magnet/MagnetBoard';
import { DEFAULT_TAB_MAX_WIDTH } from '@components/magnet/constants';
import type { IPostIt } from '@components/magnet/types';
import { useArgs } from '@storybook/client-api';
import { type Meta, type StoryFn } from '@storybook/react';

import './styles.css';

export default {
  component: MagnetBoard,
  title: 'Example/MagnetBoard',
} as Meta<typeof MagnetBoard>;

const Template: StoryFn<typeof MagnetBoard> = (args) => {
  const [_args, updateArgs] = useArgs();

  const handleChangePostItList = (newPostItList: IPostIt[]) => {
    updateArgs({ postItList: newPostItList });
  };

  return <MagnetBoard {...args} onChangePostItList={handleChangePostItList} />;
};
export const Default = Template.bind({});

const TEST_1_Component: FC = () => {
  const id = uuidv4();
  const [test, setTest] = useState(id);

  const handleClick = () => {
    setTest('111');
  };

  return (
    <div>
      <div>테스트 1 컴포넌트 {test}</div>
      <button onClick={handleClick}>버튼 클릭</button>
    </div>
  );
};

const TEST_2_Component: FC = () => {
  const [test, setTest] = useState('222');

  useEffect(() => {
    setTest('vnvnvn');
  }, []);

  return <div>테스트 2 컴포넌트 {test}</div>;
};

const postItTypeItems = { TEST1: TEST_1_Component, TEST2: TEST_2_Component };

const postItList = [];
for (let i = 0; i < 4; i++) {
  postItList.push({
    id: 'test' + i,
    title: '테스트' + i,
    type: 'TEST1',
    left: 0,
    top: 0,
    order: 0,
    width: 300,
    height: 300,
    tabLeft: i * DEFAULT_TAB_MAX_WIDTH,
    activeTabId: 'test0',
    tabWidth: DEFAULT_TAB_MAX_WIDTH,
  });
}
for (let i = 0; i < 4; i++) {
  postItList.push({
    id: 'test' + i+10,
    title: '테스트' + i+10,
    type: 'TEST2',
    left: 0,
    top: 400,
    order: 0,
    width: 300,
    height: 300,
    tabLeft: i * DEFAULT_TAB_MAX_WIDTH,
    activeTabId: 'test110',
    tabWidth: DEFAULT_TAB_MAX_WIDTH,
  });
}

Default.args = {
  tabWidth: DEFAULT_TAB_MAX_WIDTH,
  postItList,
  postItTypeItems,
  theme: {
    magnetBoard: {
      background: '#1E1E1E',
    },
    postIt: {
      header: '#323233',
      headerActive: '#202020',
      tabActiveFont: '#ffffff',
      close: '#ffffff',
      tabHover: 'rgba(255,255,255, 0.05)',
      closeHover: 'rgba(255, 255, 255, 0.5)',
      content: '#171717',
      activeBorder: '#7BCCCC',
      border: '#3C4043',
      shadow: '#000',
    },
  },
};
