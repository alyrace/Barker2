import { api } from "../../utils/api";

export const updateProfile = async ({ state }, payload) => {
  state.user.userLoading = true;
  try {
    const res = await api.put(`/users/`, payload);
    if (res.data.success) {
      state.user.user = res.data.data;
      localStorage.setItem("barker-user", JSON.stringify(res.data.data));
    }
    state.user.userLoading = false;
  } catch (err) {
    state.user.userLoading = false;
  }
};

export const logOut = ({ state }) => {
  localStorage.removeItem("barker-user-token");
  localStorage.removeItem("barker-user");
  state.user.user = null;
  state.user.userLoading = false;
  state.user.userError = null;
};

export const loginUser = async ({ state, effects, actions }, payload) => {
  const { email, password } = payload;
  state.user.userLoading = true;
  try {
    const { data: tokenRes } = await api.post(`/users/login`, {
      email,
      password,
    });

    if (tokenRes.success) {
      state.user.userError = null;
      localStorage.setItem("barker-user-token", tokenRes.token);
      //api.defaults.headers.common["Authorization"] = 'x-auth-token';
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenRes.token}`;
      const { data: userRes } = await api.get(`/users/me`);
      if (userRes.success) {
        state.user.userLoading = false;
        state.user.userError = null;
        localStorage.setItem("barker-user", JSON.stringify(userRes.data));
        state.user.user = userRes.data;
      } else {
        state.user.userError = userRes.error;
        state.user.userLoading = false;
      }
    } else {
      state.user.userError = tokenRes.error;
      state.user.userLoading = false;
    }
  } catch (err) {
    state.user.user = null;
    state.user.userError = "Wrong email or password";
    state.user.userLoading = false;
  }
};

export const registerNewUser = async ({ state, effects, actions }, payload) => {
  const { name, email, password } = payload;
  state.user.userLoading = true;
  try {
    const { data: tokenRes } = await api.post(`/users/register`, {
      name,
      email,
      password,
    });
    if (tokenRes.success) {
      state.user.userError = null;
      localStorage.setItem("barker-user-token", tokenRes.token);
      //api.defaults.headers.common["Authorization"] = 'x-auth-token';
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenRes.token}`;
      const { data: userRes } = await api.get(`/users/me`);
      if (userRes.success) {
        state.user.userLoading = false;
        state.user.userError = null;
        localStorage.setItem("barker-user", JSON.stringify(userRes.data));
        state.user.user = userRes.data;
      } else {
        state.user.userError = userRes.error;
        state.user.userLoading = false;
      }
    } else {
      state.user.userError = tokenRes.error;
      state.user.userLoading = false;
    }
  } catch (err) {
    state.user.user = null;
    state.user.userError = "Email already taken";
    state.user.userLoading = false;
  }
};