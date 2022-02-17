/// <reference types="react-scripts" />
/// <reference types="react-dom/experimental" />
declare module '*.worker.ts' {
  class MyWorker extends Worker {
    constructor();
  }

  export default MyWorker;
}

declare module '*.sw.ts' {
  declare const SW: {
    prototype: Promise<ServiceWorkerRegistration>;
    new (options?: { scope: string }): Promise<ServiceWorkerRegistration>;
  };
  export default SW;
}
