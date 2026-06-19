const localStorageHelpers = {
  get: () => localStorage.getItem("token"),
  set: (json) => localStorage.setItem("token", json),
};

export { localStorageHelpers };
