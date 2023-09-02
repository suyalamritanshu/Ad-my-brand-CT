"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersComponent from "./UserComponent";
import Toast from "../../Components/Toast";
import Loading from "../../Components/Loading";

export default function Home() {

  const [user, setUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [menuError, setMenuError] = useState(false);
  const [error, setError] = useState(false);
  const [titleBorderColor, setTitleBorderColor] = useState("1px solid #ccc");
  const [descBorderColor, setDescBorderColor] = useState("1px solid #ccc");
  const [menuBorderColor, setMenuBorderColor] = useState("1px solid #ccc");

  const handleSelect = (item) => { setUser(item); setMenuBorderColor("1px solid #ccc") };

  const handleSubmit = () => {
    setloading(true);
    if (!Object.keys(user).length && !title.length && !desc.length) {
      console.log("Error")
      setMenuBorderColor("1px solid #ff0000");
      setTitleBorderColor("1px solid #ff0000");
      setDescBorderColor("1px solid #ff0000");
      setShowError(true);
      setloading(false);
    }
    else if (!Object.keys(user).length) {
      setMenuBorderColor("1px solid #ff0000");
      setMenuError(true);
      setloading(false)
    }
    else if (!title.length) {
      setTitleBorderColor("1px solid #ff0000");
      setTitleError(true);
      setloading(false)
    }
    else if (!desc.length) {
      setDescBorderColor("1px solid #ff0000");
      setDescError(true);
      setloading(false)
    }

    else {
      axios.post("https://jsonplaceholder.typicode.com/posts", {
        userId: user.id,
        title,
        desc,
      }).then(() => {
        setloading(false);
        setSuccess(true)
        setUser({});
        setTitle("");
        setDesc("");
      }).catch((error) => {
        setloading(false);
        setDisabled(true)
        console.log(error);
        setShowError(true);
        showError(true)
      });
    }
  };

  useEffect(() => {
    setloading(true)
    axios.get("https://jsonplaceholder.typicode.com/users").then(
      (res) => {
        setloading(false);
        setUserList(res.data.map((item) => ({ id: item.id, name: item.name, lat: item.address.geo.lat, lng: item.address.geo.lng })))
      }).catch((err) => {
        setloading(false);
        showError(true)
      });
  }, []);
  return (
    <div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', marginTop: '13rem'
      }} >
        <UsersComponent item={user} userList={userList} handleChange={handleSelect} showBorderColor={menuBorderColor} />

        <div className="form-group">
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setTitleBorderColor("1px solid #ccc") }}
            required
            style={{ width: '100%', padding: '8px', border: titleBorderColor, borderRadius: '4px' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc" style={{ display: 'block', marginBottom: '5px', marginTop: "20px" }}>Description:</label>
          <input
            id="desc"
            name="desc"
            value={desc}
            onChange={(e) => { setDesc(e.target.value); setDescBorderColor("1px solid #ccc") }}
            required
            style={{ width: '100%', padding: '8px', border: descBorderColor, borderRadius: '4px' }}
          />
        </div>

        <div onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "20px" }}>
          <button id="submit_Btn" disabled={disabled} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: "10px", }}  >Submit</button>
        </div>


      </div>
      {showError &&
        <Toast
          message="No user, title, description found"
          duration={2000}
          onClose={() => setShowError(false)}
        />
      }

      {success &&
        <Toast
          message="Hey! Data sent"
          duration={2000}
          onClose={() => setSuccess(false)}
        />
      }

      {titleError &&
        <Toast
          message="Validation Error: Please enter title"
          duration={1000}
          onClose={() => setTitleError(false)}
        />
      }

      {descError &&
        <Toast
          message="Validation Error: Please enter description"
          duration={1000}
          onClose={() => setDescError(false)}
        />
      }

      {menuError &&
        <Toast
          message="Validation Error: Please select user"
          duration={1000}
          onClose={() => setMenuError(false)}
        />
      }

      {error &&
        <Toast
          message="Something wrong on our end, fixing it!!"
          duration={1000}
          onClose={() => setMenuError(false)}
        />
      }

      {loading &&
        <Loading />}
    </div>
  )
}
