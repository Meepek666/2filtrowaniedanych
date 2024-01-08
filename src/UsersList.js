import { useEffect, useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    usertype: "Admin",
  });


  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevDataForm) => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const filterUsers = (type) => {
    if (type === 'showadmin') {
      const admins = users.filter(user => user.usertype === 'Admin');
      setFilteredUsers(admins);
    } else if (type === 'showuser') {
      const usersfilter = users.filter(user => user.usertype === 'User');
      setFilteredUsers(usersfilter);
    } else {
      setFilteredUsers(users);
    }

  };
  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }));
  };

  const removeUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id)
    setUsers(filteredUsers)
  }

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  return (
    <div className="usersList">
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="User email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="usertype">User type</label>
        <select id="usertype" name="usertype" onChange={handleInputChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <input type="submit" value="submit" />
      </form>
      <div>
        <button onClick={() => filterUsers('showadmin')}>Wyświetl tylko adminów</button>
        <button onClick={() => filterUsers('showuser')}>Wyświetl tylko userów</button>
        <button onClick={() => filterUsers('showall')}>Wyświetl wszystkich</button>
      </div>
      <ul>

        {filteredUsers.map(user => {
          return (
            <div className="userItem" key={user.id} onClick={() => removeUser(user.id)} >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          )

        })}
      </ul>


      
    </div>
  );
};














export default UsersList;