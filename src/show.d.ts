declare namespace ShowJS {
  type A = 'a';

  enum DISTRICT {
    '430101000000' = '长沙市直',
    '430102999000' = '芙蓉区',
    '430103999000' = '天心区',
    '430104999000' = '岳麓区',
    '430105999000' = '开福区',
    '430111999000' = '雨花区',
    '430112999000' = '望城区',
    '430121999000' = '长沙县',
    '430131999000' = '天心经开区',
    '430133999000' = '宁乡经开区',
    '430134999000' = '宁乡高新区',
    '430135999000' = '岳麓高新区',
    '430136999000' = '望城经开区',
    '430137999000' = '浏阳经开区',
    '430138999000' = '长沙金霞经开区',
    '430143999000' = '雨花经开区',
    '430144999000' = '隆平高科技园',
    '430146999000' = '长沙高铁新城管理委员会',
    '430147999000' = '马栏山（长沙）视频文创园管委会',
    '430181999000' = '浏阳市',
    '430182999000' = '宁乡市',
    '430196999000' = '长沙高新区',
    '430198000000' = '长沙经开区',
    '430199999000' = '湘江新区',
  }
}

// type B = ShowJS.A;
// export = ShowJS;
// export { ShowJS };
declare module 'url' {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}

// declare module 'hot-new-module';
export = ShowJS;
// export as namespace ShowJS;
declare global {
  type C = c;
}
