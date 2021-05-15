const users = [];

const userActions = {
  addUser: ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    let user = { id, name, room };
    console.log(users);
    const existingUser = users.find(
      (user) => user.room === room && user.name === name
    );
    if (existingUser) {
      return { error: "User name is already exist", user };
    } else {
      users.push(user);
      console.log(users);
      return { error: "", user };
    }
  },

  removeUser: (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index > -1) {
      return users.splice(index, 1)[0];
    }
  },

  getUser: (id) => {
    console.log(users);
    return users.find((user) => user.id === id);
  },

  getUserInRoom: (room) => users.find((user) => user.room === room),
};

module.exports = userActions;
