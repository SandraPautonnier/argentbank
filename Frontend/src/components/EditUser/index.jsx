import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile, updateUserName } from "../../redux/userSlice";

const EditUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userName, firstName, lastName } = useSelector((state) => state.user);
  const [tempUserName, setTempUserName] = useState(userName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  // Pour afficher les données de l'utilisateur
  const userInfo = async () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      setError("Token is missing");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data.body);
      const userName = data.body?.userName;
      const firstName = data.body?.firstName;
      const lastName = data.body?.lastName;
      dispatch(userProfile({ userName, lastName, firstName }))

    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  userInfo();

  // Pour modifier le nom d'utilisateur
  const handleChange = (e) => {
    setTempUserName(e.target.value);
    setError("");
  };
  const handleSave = async () => {
    setLoading(true);
    setError("");
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    // Validation pour vérifier si le champ est vide
    if (tempUserName.trim() === "") {
      alert("Le nom d'utilisateur ne peut pas être vide !");
      setLoading(false);
      return;
    }
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
        alert("Nom d'utilisateur modifié avec succès !");
        setIsOpen(false); // Referme le mode modification
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
            {userName}
          </h1>
          <div>
            <button className="edit-button" onClick={() => setIsOpen(true)}>
              Edit Name
            </button>
          </div>
        </>
      ) : (
        <div className="edit-user-content">
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
          <div className="buttons-save-cancel">
            <button className="save-cancel-button" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button className="save-cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
