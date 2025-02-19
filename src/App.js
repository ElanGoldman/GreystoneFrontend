import './App.css';
import UserTable from './components/userTable.js';
import CreateUser from './components/createUser.js';
import AddLoan from './components/addLoan.js';
import LoanTable from './components/loanTable.js';
import Shareloan from './components/shareLoan.js';
import { useEffect, useState } from "react";


function App() {
  const [view, setView] = useState("users");
  return (
    <div className="h-screen flex flex-col">
      <main className="">
        <header className="App-header">
          <button onClick={() => setView("users")} className="bg-blue-500 hover:bg-blue-600">
            Users
          </button>

          <button onClick={() => setView("loans")} className="bg-blue-500 hover:bg-blue-600">
            Loans
          </button>
        </header>

        {view === "users" && (<div id = "users"> <CreateUser className="element" />  <UserTable className="element" /> </div>)}

        {view === "loans" && (<div id="loans"> <LoanTable className="element" /> <AddLoan className="element" /> <Shareloan className="element" /> </div>)}
      </main>
    </div>
  );
}

export default App;
