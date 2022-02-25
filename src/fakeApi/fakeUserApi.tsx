import { User, Post } from 'vo/UserVO';

export function fetchUser(userId = 0): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      console.log('fetched user ' + userId);
      switch (userId) {
        case 0:
          resolve({
            name: '0Ringo Starr',
          });
          break;
        case 1:
          resolve({
            name: '1George Harrison',
          });
          break;
        case 2:
          resolve({
            name: '2John Lennon',
          });
          break;
        case 3:
          resolve({
            name: '3Paul McCartney',
          });
          break;
        default:
          throw Error('Unknown user.');
      }
    }, 100 * Math.random());
  });
}
export function fetchPosts(userId = 0): Promise<Post[]> {
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      console.log('fetched posts for ' + userId);
      switch (userId) {
        case 0:
          resolve([
            {
              id: 0,
              text: '0I get by with a little help from my friends',
            },
            {
              id: 1,
              text: "0I'd like to be under the sea in an octupus's garden",
            },
            {
              id: 2,
              text: '0You got that sand all over your feet',
            },
          ]);
          break;
        case 1:
          resolve([
            {
              id: 0,
              text: '1Turn off your mind, relax, and float downstream',
            },
            {
              id: 1,
              text: '1All things must pass',
            },
            {
              id: 2,
              text: "1I look at the world and I notice it's turning",
            },
          ]);
          break;
        case 2:
          resolve([
            {
              id: 0,
              text: '2Living is easy with eyes closed',
            },
            {
              id: 1,
              text: "2Nothing's gonna change my world",
            },
            {
              id: 2,
              text: '2I am the walrus',
            },
          ]);
          break;
        case 3:
          resolve([
            {
              id: 0,
              text: '3Woke up, fell out of bed',
            },
            {
              id: 1,
              text: '3Here, there, and everywhere',
            },
            {
              id: 2,
              text: '3Two of us sending postcards, writing letters',
            },
          ]);
          break;
        default:
          throw Error('Unknown user.');
      }
    }, 2000 * Math.random());
  });
}
