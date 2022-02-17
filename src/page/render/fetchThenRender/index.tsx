/* 
  fetch then render（接收到全部数据之后渲染）：
  该方案解决“瀑布”问题，但也引出了新问题：
    即便我们先接收完用户信息的数据，用户信息也无法优先渲染出来。
    Promise.all 会等待所有请求成功完成后才会修改状态为：fulFilled。
  解决方案很简单，改写成等待两个独立的数据请求就行了。但这同样存在问题：
    Race Conditions：
      绝大多数情况，我们是通过 id 获取用户信息和用户 posts 。这使得在频繁切换 id 时用户信息和用户 posts 不一致。
      因为网络问题，旧的请求可能晚于新的请求，最终导致用户信息是最新数据但用户 posts 是过时数据。
*/

/* 
需求：用户的信息渲染必须先于用户的 posts 渲染
*/
import { FunctionComponent, useEffect, useState } from 'react';
import { fetchUser, fetchPosts } from 'fakeApi/fakeUserApi';
import { User, Post } from 'vo/UserVO';
export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    Promise.all([fetchUser(), fetchPosts()]).then(([user, posts]) => {
      setUser(user);
      setPosts(posts);
    });
    // 改写后的代码
    // fetchUser().then((user) => setUser(user));
    // fetchPosts().then((posts) => setPosts(posts));
  }, []);
  if (!user) {
    return <h1>Loading userinfo...</h1>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <UserPosts posts={posts} />
    </div>
  );
}

type PropsType = {
  posts: Post[] | null;
};

const UserPosts: FunctionComponent<PropsType> = ({ posts }: PropsType) => {
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
};
