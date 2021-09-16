const user = localStorage.getItem("barker-user");

export const state = {
  user: user ? JSON.parse(user) : null,
  userLoading: false,
  userError: null,
};