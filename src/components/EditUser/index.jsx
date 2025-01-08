import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const EditUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userName, firstName, lastName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [tempUserName, setTempUserName] = useState(userName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setTempUserName(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: tempUserName }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateUserName({ userName: tempUserName }));
        alert("User Name updated successfully!");
        setIsOpen(false);
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    alert("Les informations seront perdues !");
    setIsOpen(false);
  };

  return (
    <div className="header">
      {!isOpen ? (
        <>
          <h1>
            Welcome back <br />
            {firstName} {lastName}
          </h1>
          <div>
            <button className="edit-button" onClick={() => setIsOpen(true)}>
              Edit Name
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2>Edit user info</h2>
          <div>
            <label>User Name</label>
            <input type="text" value={tempUserName} onChange={handleChange} />
          </div>
          <div>
            <label>First Name</label>
            <input type="text" value={firstName} disabled />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" value={lastName} disabled />
          </div>
          <div>
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default EditUser;
