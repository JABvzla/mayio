import axios from "axios";

const config = {
  url: "http://localhost:1337/",
  tokenPath: "_token",
  auth: (path) => {
      if(localStorage.getItem(config.tokenPath))
        return config.url + path + "?token=" + localStorage.getItem("_token");
      return config.url + path;
    },
};


class Connection {

  constructor(){
    this.url = config.url;
  }

  auth(path){
    return this.url + path + "?token=" + localStorage.getItem("_token");
  }

  call = (path, data = [], method = "GET") => {
    return new Promise(function(resolve, reject) {
      let option = {
        url: config.auth(path),
        method:method
      };

      if(method==="GET") option["params"] = data;
      else option["data"] = data;

      axios(option).then(r=> resolve(r))
        .catch(e=>{
          if(e.response.status === 401 && window.location.pathname !== "/login"){
            localStorage.clear();
            window.location.href = "/login";
          }
          reject(e);
        });
    })
  };


}

export default new Connection();