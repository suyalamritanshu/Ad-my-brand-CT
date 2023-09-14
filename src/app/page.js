"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersComponent from "./UserComponent";
import Toast from "../../Components/Toast";
import Loading from "../../Components/Loading";

export default function Home() {
  const initialState = {
    user: {},
    userList: [],
    title: "",
    desc: "",
    showError: false,
    success: false,
    loading: false,
    disabled: false,
    titleError: false,
    descError: false,
    menuError: false,
    error: false,
  };

  const [formState, setFormState] = useState(initialState);

  const borderColors = {
    titleBorderColor: "1px solid #ccc",
    descBorderColor: "1px solid #ccc",
    menuBorderColor: "1px solid #ccc",
  };

  const [borderState, setBorderState] = useState(borderColors);

  const handleSelect = (item) => {
    setFormState({ ...formState, user: item });
    setBorderState({ ...borderState, menuBorderColor: "1px solid #ccc", titleBorderColor: "1px solid #ccc", descBorderColor: "1px solid #ccc" });
  };

  const handleTitle = (item) =>{
    setFormState({ ...formState, title: item, titleError: false }); 
    setBorderState({ ...borderState, titleBorderColor: "1px solid #ccc"})
  }

  const handleDesc = (item) =>{
    setFormState({ ...formState, desc: item, descError: false }); 
    setBorderState({ ...borderState, descBorderColor: "1px solid #ccc"})
  }

  const handleSubmit = () => {
    setFormState({ ...formState, loading: true });
    const { user, title, desc } = formState;
    const { menuBorderColor, titleBorderColor, descBorderColor } = borderState;

    if (!Object.keys(user).length && !title.length && !desc.length) {
      setBorderState({
        menuBorderColor: "1px solid #ff0000",
        titleBorderColor: "1px solid #ff0000",
        descBorderColor: "1px solid #ff0000",
      });
      setFormState({ ...formState, showError: true, loading: false });
    } else if (!Object.keys(user).length) {
      setBorderState({ ...borderState, menuBorderColor: "1px solid #ff0000" });
      setFormState({ ...formState, menuError: true, loading: false });
    } else if (!title.length) {
      setBorderState({ ...borderState, titleBorderColor: "1px solid #ff0000" });
      setFormState({ ...formState, titleError: true, loading: false });
    } else if (!desc.length) {
      setBorderState({ ...borderState, descBorderColor: "1px solid #ff0000" });
      setFormState({ ...formState, descError: true, loading: false });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          userId: user.id,
          title,
          desc,
        })
        .then(() => {
          setFormState({
            ...initialState,
            success: true,
          });
          setBorderState({
            ...borderState,
            menuBorderColor: "1px solid #ccc", titleBorderColor: "1px solid #ccc", descBorderColor: "1px solid #ccc"
          })
        })
        .catch((error) => {
          setFormState({
            ...formState,
            loading: false,
            disabled: true,
            error: true,
            showError: true,
          });
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setFormState({ ...formState, loading: true });
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setFormState({
          ...formState,
          loading: false,
          userList: res.data.map((item) => ({
            id: item.id,
            name: item.name,
            lat: item.address.geo.lat,
            lng: item.address.geo.lng,
          })),
        });
      })
      .catch((err) => {
        setFormState({
          ...formState,
          loading: false,
          showError: true,
        });
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "13rem",
        }}
      >
        <UsersComponent
          item={formState.user}
          userList={formState.userList}
          handleChange={handleSelect}
          showBorderColor={borderState.menuBorderColor}
        />

        <div className="form-group">
          <label htmlFor="title" style={{ display: "block", marginBottom: "5px" }}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={(e) =>
              handleTitle(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "8px",
              border: borderState.titleBorderColor,
              borderRadius: "4px",
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc" style={{ display: "block", marginBottom: "5px", marginTop: "20px" }}>
            Description:
          </label>
          <input
            id="desc"
            name="desc"
            value={formState.desc}
            onChange={(e) =>
              handleDesc(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "8px",
              border: borderState.descBorderColor,
              borderRadius: "4px",
            }}
          />
        </div>

        <div
          onClick={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            id="submit_Btn"
            disabled={formState.disabled}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {formState.showError && (
        <Toast message="No user, title, description found" duration={2000} onClose={() => setFormState({ ...formState, showError: false })} />
      )}

      {formState.success && (
        <Toast message="Hey! Data sent" duration={2000} onClose={() => setFormState({ ...formState, success: false })} />
      )}

      {formState.titleError && (
        <Toast message="Validation Error: Please enter title" duration={1000} onClose={() => setFormState({ ...formState, titleError: false })} />
      )}

      {formState.descError && (
        <Toast message="Validation Error: Please enter description" duration={1000} onClose={() => setFormState({ ...formState, descError: false })} />
      )}

      {formState.menuError && (
        <Toast message="Validation Error: Please select user" duration={1000} onClose={() => setFormState({ ...formState, menuError: false })} />
      )}

      {formState.error && (
        <Toast message="Something wrong on our end, fixing it!!" duration={1000} onClose={() => setFormState({ ...formState, error: false })} />
      )}

      {formState.loading && <Loading />}
    </div>
  );
}
