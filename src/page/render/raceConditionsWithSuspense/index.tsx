/* 
  Solving Race Conditions with Suspense:
  使用 suspense 解决条件竞争：
    为什么使用 suspense 能解决条件竞争的问题了？
    这是因为 suspense 任务优先级低于‘用户事件’任务的优先级，
    频繁点击按钮，会使得上次的 suspense 任务暂时挂起，优先执行‘用户事件’任务，
    待用户停止点击时，会批量更新被挂起的 suspense 任务，
    为了加快渲染速度，react 只会渲染最终状态。
    但为了保证组件状态正确，下一次的 state 会基于上一次的 state，而不会跳跃性修改 state，
    从而保证了渲染的正确性
*/

/* 
需求：用户的信息渲染必须先于用户的 posts 渲染
*/
import {
  FunctionComponent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchUser, fetchPosts } from 'fakeApi/fakeUserApi';
import { User, Post } from 'vo/UserVO';
import { suspenseFetch } from 'utils/suspense-util';

function getNextId(id: number) {
  return id === 3 ? 0 : id + 1;
}

export default function () {
  const [id, setId] = useState(0);
  return (
    <div>
      <button onClick={() => setId(getNextId(id))}>next</button>
      <Suspense fallback={<h1>Loading userinfo...</h1>}>
        <UserInfo id={id} />
        <Suspense fallback={<h2>Loading posts...</h2>}>
          <UserPosts id={id} />
        </Suspense>
      </Suspense>
    </div>
  );
}

const UserInfo: FunctionComponent<{ id: number }> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userFetch = suspenseFetch(fetchUser, id);
    setUser(userFetch);
  }, [id]);
  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  );
};

const UserPosts: FunctionComponent<{ id: number }> = ({ id }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    const postsFetch = suspenseFetch(fetchPosts, id);
    setPosts(postsFetch);
  }, [id]);
  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
};
