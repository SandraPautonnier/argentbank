import React from "react";
import { Navigate } from "react-router-dom";
import { loginSuccess } from "../../redux/userSlice";
import EditUser from "../../components/EditUser";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Account from "../../components/Account";

const User = () => {
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
  ];

  if (!loginSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="content-body">
      <NavBar />
      <main className="main bg-dark">
        <EditUser />
        <h2 className="sr-only">Accounts</h2>
        <div className="accounts">
          {accounts.map((account, index) => (
            <Account
              key={index}
              title={account.title}
              amount={account.amount}
              description={account.description}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default User;
