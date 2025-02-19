import PostTemplate from "./postTemplate.js";

const API_URL = "https://gl-interview.azurewebsites.net/users";

export default function CreateUser() {
  return (
      <div className = "createUser">
        <PostTemplate 
          name = {"Create user"}
          apiUrl = {API_URL}
          fields = {{"username" : "string" }}
        />
      </div>
    );
}
