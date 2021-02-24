enum Status {
  'pending',
  'success',
  'error',
}

export const suspenseFetch = function <T>(promiseFn: () => Promise<T>) {
  let status: Status = Status.pending;
  let result: T;
  const promise = promiseFn();
  promise.then(
    (v) => {
      status = Status.success;
      result = v;
    },
    (e) => {
      status = Status.error;
      result = e;
    }
  );

  return function (): T {
    if (status === Status.pending) throw promise;
    if (status === Status.error) throw result;
    return result;
  };
};
