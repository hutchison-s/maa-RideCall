import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import KidMapDisplay from "../components/KidMapDisplay";
import './DisplayFamilies.css'

const titles = {
  "K,0": "Kindergarten",
  "1,2": "1st & 2nd Grade",
  "3,4": "3rd & 4th Grade",
  "5,6": "5th & 6th Grade",
  "7,8": "7th & 8th Grade",
};

export default function DisplayFamilies() {
  const [familyData, setFamilyData] = useState([]);
  const [room, setRoom] = useState(null);

  function getFamilies() {
    fetch("https://maa-rides-backend.onrender.com/families", {headers: {'Authorization': JSON.parse(sessionStorage.getItem("rideCallKey"))}})
      .then((response) => response.json())
      .then((body) => {
        const kidsList = [];
        body.forEach((fam) => {
          if (fam.dateCalled === new Date().toDateString()) {
            fam.members.forEach((kid) => {
              kidsList.push({ id: fam.id, name: kid.name, grade: kid.grade });
            });
          }
        });
        setFamilyData(kidsList);
      })
      .catch((err) => {
        console.log("Couldn't Process Request. Error: " + err);
      });
  }

  useEffect(() => {
    setInterval(getFamilies, 5000);
    getFamilies();
  }, []);

  return (
    <>
      <PageHeader title={`Rides called ${new Date().toDateString()}`} />
      <h1 style={{ margin: "0.5rem 2rem" }}>
        {room ? room : "Select a room to display today's rides"}
      </h1>
      <label
        style={{ margin: "0.5rem 2rem", fontSize: "1.5rem" }}
        htmlFor="roomSelector"
      >
        Room to Display:{" "}
      </label>
      <select
        style={{ fontSize: "1.5rem", padding: "0.2rem" }}
        value=" "
        id="roomSelector"
        onChange={(e) => {
          setRoom(titles[e.target.value]);
        }}
      >
        <option value=" "> </option>
        <option value="K,0">Kindergarten</option>
        <option value="1,2">1-2</option>
        <option value="3,4">3-4</option>
        <option value="5,6">5-6</option>
        <option value="7,8">7-8</option>
      </select>
      {familyData && room && (
        <KidMapDisplay room={room} data={familyData} />
      )}
    </>
  );
}
