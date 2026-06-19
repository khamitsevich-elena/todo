const localStorageHelpers = {
  get: () => localStorage.getItem("token"),
  set: (data) => localStorage.setItem("token", data),
};

export { localStorageHelpers };
