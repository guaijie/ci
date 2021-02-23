import { useState } from 'react';

export default function UserInfo() {
  const [user, setUser] = useState(null);
  if (!user) {
    return <h1>userinfo is loading</h1>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <UserPosts />
    </div>
  );
}

function UserPosts() {
  const [posts, setPosts] = useState(null);

  if (!posts) {
    return <h2>posts is loading</h2>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.content}</li>
      ))}
    </ul>
  );
}
