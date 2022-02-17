/* 
  fetch on render（渲染之后获取数据）：
  例如：
    1. 在 useEffect 或 componentDidMount 中拉取资源，会在页面第一次渲染结束后获取资源。
    2. 如下 'waterfall' 式资源获取问题（posts 必定会在 user 加载完成后才开始加载）。
    (1) 很容易造成 (2) 这种“瀑布式”问题，这会导致此次总渲染时间必定是各个获取资源时间的总和。
  那如何加快渲染速度了？
    我们想到的是避免“瀑布式”问题，让所有请求同时进行，这样总的渲染时间就取决最慢的资源请求时间
*/

/* 
需求：用户的信息渲染必须先于用户的 posts 渲染
下面这段代码会出现 waterfall 式资源加载
*/
import { useEffect, useState } from 'react';
import { fetchUser, fetchPosts } from 'fakeApi/fakeUserApi';
import { User, Post } from 'vo/UserVO';
export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, []);
  if (!user) {
    return <h1>Loading userinfo...</h1>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <UserPosts />
    </div>
  );
}

function UserPosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
  });
  if (!posts) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
