const connection = {
  url: "http://localhost:1337/",
  auth: (path) => connection.url + path + "?token=" + localStorage.getItem("_token")
};

export default connection;