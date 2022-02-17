/* 
  Race Conditions（条件竞争）：
  当我们快速多次点击 next 按钮时，会出现用户信息和用户 posts 显示不一致的现象。
  这是因为网络问题导致旧的请求可能晚于新的请求，最终可能导致用户信息是最新数据但用户 posts 是过时数据。
*/

/* 
需求：用户的信息渲染必须先于用户的 posts 渲染
*/
import { FunctionComponent, useEffect, useState } from 'react';
import { fetchUser, fetchPosts } from 'fakeApi/fakeUserApi';
import { User, Post } from 'vo/UserVO';

function getNextId(id: number) {
  return id === 3 ? 0 : id + 1;
}

export default function () {
  const [id, setId] = useState(0);
  return (
    <div>
      <button onClick={() => setId(getNextId(id))}>next</button>
      <UserInfo id={id} />
    </div>
  );
}

const UserInfo: FunctionComponent<{ id: number }> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser(id).then((user) => setUser(user));
  }, [id]);
  if (!user) {
    return <h1>Loading userinfo...</h1>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <UserPosts id={id} />
    </div>
  );
};

const UserPosts: FunctionComponent<{ id: number }> = ({ id }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    fetchPosts(id).then((posts) => setPosts(posts));
  }, [id]);
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
