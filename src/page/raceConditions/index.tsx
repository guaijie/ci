/* 
  Race Conditions:
  条件竞争
*/

/* 
需求：用户的信息渲染必须先于用户的 posts 渲染
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
