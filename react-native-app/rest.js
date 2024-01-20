async function addUserToDB(user, url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    console.log("User added to database");
  }
}

async function updateUser(user, id) {
  const response = await fetch(`http://192.168.1.6:6969/users/${}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    console.log("User updated in database");
  }
}

export { addUserToDB, updateUser };
