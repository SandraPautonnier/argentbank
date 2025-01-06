import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../../redux/userSlice";

const EditUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userName, firstName, lastName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [tempUserName, setTempUserName] = useState(userName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true); // État pour le chargement initial

  // Charger le userName au démarrage

  
  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Assurez-vous que `token` est défini ici
            },
            body: JSON.stringify({ userName, lastName, firstName }),
          }
        );

        const data = await response.json();

        /* console.log("data :", data); */
        

        if (response.ok) {
          dispatch(updateUserName(data.userName)); // Met à jour Redux avec le userName récupéré
          setTempUserName(data.userName); // Initialise tempUserName avec la valeur récupérée
        } else {
          throw new Error(data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false); // Terminer le chargement
      }
    };

    userInfo();
  }, [dispatch]);

  // Modifier le userName
  const handleChange = (e) => {
    setTempUserName(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: tempUserName }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(updateUserName(tempUserName)); // Met à jour Redux
        alert("User Name updated successfully!");
        setIsOpen(false); // Ferme le formulaire après la sauvegarde
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
    setTempUserName(userName);
    alert("Les informations seront perdues !");
    setIsOpen(false); // Ferme le formulaire
  };

  return (
    <div className="header">
      {!isOpen ? (
        // Affiche le H1 avec le bouton Edit Name si le formulaire est fermé
        <>
          <h1>
            Welcome back
            <br />
            {userName || "Guest!"}
          </h1>
          <div>
            <button className="edit-button" onClick={() => setIsOpen(true)}>
              Edit Name
            </button>
          </div>
        </>
      ) : (
        // Affiche le formulaire si le formulaire est ouvert
        <div>
          <h2>Edit user info</h2>
          <div>
            <label>User name</label>
            <input type="text" value={tempUserName} onChange={handleChange} />
          </div>
          <div>
            <label>First name</label>
            <input type="text" value={firstName} disabled />
          </div>
          <div>
            <label>Last name</label>
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
