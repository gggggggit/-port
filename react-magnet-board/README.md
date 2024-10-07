# React Magnet Board

AI 서비스 개발실 웹팀에서 개발한 리액트 마그넷 보드 입니다.

## 이용가능한 명령어

프로젝트 루트에서 실행:

### `yarn dev`

개발 서버를 실행합니다.

### `yarn build`

배포용 빌드 작업을 실행합니다.

npm에 배포전에 실행되어야 할 작업 입니다.

### `yarn preview`

로컬에서 배포용 빌드에 대한 프리뷰 서버를 실행합니다.

### `yarn npm publish`

yarn build로 나온 결과물을 npm에 게시합니다.

## 사용방법

1. react-magnet-board의 npm 레지스트리 서버를 https://repo.ncsoft.net/artifactory/api/npm/aibiz-npm-local/ 로 설정

2. yarn add react-magnet-board

   > 또는 npm install react-manget-board

3. component 와 style import

   ```
   import { MagnetBoard } from 'react-magnet-board';
   import 'react-magnet-board/dist/style.css';
   ...

   const POST_IT_TYPE_ITEMS = {
     TEST: TestComponent,
   };

   const MyComponent = () => {
     const [postItList, setPostItList] = useState([{
       id: INIT_ID_1,
       title: '테스트',
       type: 'TEST',
       left: 0,
       top: 0,
       order: 0,
       width: 300,
       height: 300,
       activeTabId: INIT_ID_1,
       tabLeft: 0,
       tabWidth: DEFAULT_TAB_MAX_WIDTH,
    });

    return <MagnetBoard
      postItList={postItList}
      postItTypeItems={POST_IT_TYPE_ITEMS}
      onChangePostItList={setPostItList}
    />
   }
   export default MyComponent;
   ```

## API

---

### Properties

| Name            | Type                    | Default   | Required | Description                                                           |
| --------------- | ----------------------- | --------- | -------- | --------------------------------------------------------------------- |
| postItList      | IPostIt[]               | []        | true     | magnet-board 안에서 움직일 수 있는 postIt 목록들                      |
| postItTypeItems | Record<string, FC<any>> | []        | true     | postIt type에서 명시한 type으로 FC를 꺼내와서 화면에 render를 해준다. |
| theme           | ITheme                  | 아래 참고 | false    | magnet board theme                                                    |

## Type

---

### IPostIt

| Name            | Type    | Required | Description                                           |
| --------------- | ------- | -------- | ----------------------------------------------------- |
| id              | string  | true     | postIt Id (unique)                                    |
| title           | string  | true     | postIt 제목 (=tab 제목)                               |
| type            | string  | true     | postIt type, postItTypeItems에 명시된 type            |
| left            | number  | true     | postIt의 position left 값                             |
| top             | number  | true     | postIt의 position top 값                              |
| width           | number  | true     | postIt의 가로 길이                                    |
| height          | number  | true     | postIt의 세로 길이                                    |
| order           | number  | true     | postIt의 순서 (z-index값)                             |
| activeTabId     | string  | true     | 탭 목록에서 현재 활성화된 postItId                    |
| tabLeft         | number  | true     | postIt Tab의 position left                            |
| tabWidth        | number  | true     | postIt Tab의 가로 길이                                |
| disabled        | boolean | false    | postIt 활성화 유무                                    |
| disabledMessage | string  | false    | postIt의 disabled 값이 false일때 보여줘야 되는 메세지 |

### ITheme

| Name        | Type              | Required | Description       |
| ----------- | ----------------- | -------- | ----------------- |
| magnetBaord | IThemeMagnetBoard | false    | magnet board 테마 |
| postIt      | IThemePostIt      | false    | postIt 테마       |

### IThemeMagnetBoard

| Name       | Type   | Required | Description            |
| ---------- | ------ | -------- | ---------------------- |
| background | string | false    | magnet board 배경 색상 |

### IThemePostIt

| Name          | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| header        | string | false    | postIt header 색상            |
| headerActive  | string | false    | 활성화된 postIt header 색상   |
| tabActiveFont | string | false    | 활성화된 postIt tab font 색상 |
| tabHover      | string | false    | tab hover 배경 색상           |
| close         | string | false    | 종료 X 버튼 배경 색상         |
| closeHover    | string | false    | X 종료 버튼 hover시 배경      |
| content       | string | false    | postIt content 배경 색상      |
| border        | string | false    | postIt border 색상            |
| activeBorder  | string | false    | 활성화된 postIt border 색상   |
| shadow        | string | false    | 활성화된 postIt shadow 색상   |

## Default Theme value

```
  magnetBoard: {
    background: 'white',
  },
  postIt: {
    header: '#F1F3F4',
    headerActive: '#E6E6E7',
    tabActiveFont: '#5F6368',
    tabHover: 'rgba(0,0, 0, 0.05)',
    close: '#666A6D',
    closeHover: 'rgb(0, 0, 0, 0.1)',
    content: 'white',
    border: '#CACDD1',
    activeBorder: '#8CB9F3',
    shadow: 'rgba(0,0,0,0.3)',
  },
}
```
