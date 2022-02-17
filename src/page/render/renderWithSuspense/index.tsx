/* 
  Render-as-you-fetch:
  获取数据之后渲染，使用 Suspense
  优势：
    1. 总的渲染时间取决于最慢资源获取的时间
    2. 如果用户信息优先完成加载，用户信息将被提前渲染
    3. 不会出现 Race Conditions
*/

/* 
需求：用户的信息渲染必须先于用户的 posts 渲染
*/
import { Suspense } from 'react';
import { fetchUser, fetchPosts } from 'fakeApi/fakeUserApi';
import { suspenseFetch } from 'utils/suspense-util';
import { User, Post } from 'vo/UserVO';
let suspenseFetchUser: () => User, suspenseFetchPosts: () => Post[];
export default function () {
  suspenseFetchUser = suspenseFetch(fetchUser, 0);
  suspenseFetchPosts = suspenseFetch(fetchPosts, 0);
  return (
    <Suspense fallback={<h1>Loading userinfo...</h1>}>
      <UserInfo />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <UserPosts />
      </Suspense>
    </Suspense>
  );
}

function UserInfo() {
  const user = suspenseFetchUser();
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

function UserPosts() {
  const posts = suspenseFetchPosts();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
