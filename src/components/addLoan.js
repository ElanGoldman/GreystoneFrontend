import PostTemplate from "./postTemplate.js";

const API_URL = "https://gl-interview.azurewebsites.net/loans";

export default function AddLoan() {
  return (
    <div className = "addLoan">
      <PostTemplate 
        name = {"Add loan"}
        apiUrl = {API_URL}
        fields = {{
          "amount" : "int", "apr" : "int", 
          "term" : "int", "status" : ["active", "inactive"], 
          "owner_id" : "int" 
        }}
      />
    </div>
  );
}
