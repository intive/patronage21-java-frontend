const Frisbee = require("frisbee");

const api = new Frisbee({
  baseURI: process.env.REACT_APP_USER_MODULE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
});

export const getTechGroups = async () => {
  try {
    const response = await api.get("/groups", {});
    if (response.err) {
      console.error(response.err);
      return [];
    }
    return response.body.groups;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUsers = async (role, searchedUserData) => {
  try {
    const params = ["firstName", "lastName", "username"]
      .filter(() => searchedUserData)
      .reduce((accumulator, param) => {
        accumulator[param] = searchedUserData;
        return accumulator;
      }, {});

    const response = await api.get("/users", {
      body: { ...params, role: role },
    });
    if (response.err) {
      console.error(response.err);
      return [];
    }
    return response.body.users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const params = [
      "login",
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "gitHubUrl",
      "bio",
      "projects",
    ].reduce((accumulator, param) => {
      accumulator[param] = updatedUser[param];
      return accumulator;
    }, {});
    const response = await api.put("/users", {
      body: params,
    });
    if (response.err) {
      console.error(response.err);
    }
  } catch (error) {
    console.error(error);
  }
};
