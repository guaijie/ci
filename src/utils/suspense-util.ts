enum Status {
  'pending',
  'success',
  'error',
}

export const suspenseFetch = function <T, P>(
  promiseFn: (p: P) => Promise<T>,
  params: P
) {
  let status: Status = Status.pending;
  let result: T;
  const promise = promiseFn(params);
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
