import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [allHeatmapData, setAllHeatmapData] = useState({});
  const [hoverData, setHoverData] = useState(null);
  const year = 2024;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const songList = [
    "Enemy - Imagine Dragons & JID",
    "Playground - Bea Miller",
    "Goodbye - Ramsey",
    "Guns for Hire - Woodkid",
    "Dynasties & Dystopia - Denzel Curry, Gizzle & Bren Joy",
    "Snakes - Pvris & Miyavi",
    "When Everything Went Wrong - Fantastic Negrito",
    "Our Love - Curtis Harding & Jazmine Sullivan",
    "Misfit Toys - Pusha T & Mako",
    "Dirty Little Animals - Bones UK",
    "What Could Have Been - Sting & Ray Chen",
    "Can't Slow Me Down - Aloe Blacc",
    "The Call - Kissing Dynamite",
    "Heavy Is the Crown - Mike Shinoda & Emily Armstrong",
    "I Can't Hear It Now - Freya Ridings",
    "Sucker - Marcus King",
    "Renegade (We Never Run) - Stefflon Don & Raja Kumari feat. Jarina De Marco",
    "Hellfire - Fever 333",
    "To Ashes and Blood - Woodkid",
    "Paint the Town Blue - Ashnikko",
    "Remember Me (Intro) - d4vd",
    "Remember Me - d4vd",
    "这样很好 (Isha’s Song) - Eason Chan",
    "Cocktail Molotov - ZAND",
    "What Have They Done to Us - Mako & Grey",
    "Rebel Heart - Djerv",
    "The Beast - Misha Mansoor",
    "Spin the Wheel - Mick Wingert",
    "Ma Meilleure Ennemie - Stromae & Pomme",
    "Fantastic - King Princess",
    "The Line - Twenty One Pilots",
    "Blood Sweat & Tears - Sheryl Lee Ralph",
    "Come Play - Stray Kids, Young Miko & Tom Morello",
    "Wasteland - Royal & the Serpent",
    "Enemy (Opening Title Version) - Imagine Dragons & JID"
  ];


const generateDummyDataForMonth = (month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, day) => {
    const date = new Date(year, month - 1, day + 1);
    const isFuture = (month === 11 && day + 1 > 29) || month === 12; 

    return {
      date: date.toISOString().split("T")[0], 
      plays: isFuture ? 0 : Math.floor(Math.random() * 20), 
      topSong: isFuture ? null : songList[Math.floor(Math.random() * songList.length)], 
    };
  });
};

 
  const generateDummyDataForAllMonths = () => {
    const data = {};
    for (let month = 1; month <= 12; month++) {
      data[month] = generateDummyDataForMonth(month);
    }
    return data;
  };

  useEffect(() => {
    const dummyData = generateDummyDataForAllMonths();
    setAllHeatmapData(dummyData);
  }, []);

  const getBoxColor = (plays) => {
    const intensity = Math.min(plays / 10, 1); 
    return `rgba(0, 128, 0, ${intensity})`;
  };

  return (
    <div className="App">
      <h1>Tsering's 2024 Music Heatmap</h1>
      <div className="all-months-container">
        {months.map((month, index) => (
          <div key={month} className="month-container">
            <h2>{month}</h2>
            <div className="heatmap-container">
              {(allHeatmapData[index + 1] || []).map((day) => (
                <div
                  key={day.date}
                  className="heatmap-box"
                  style={{ backgroundColor: getBoxColor(day.plays) }}
                  onMouseEnter={() => setHoverData(day)}
                  onMouseLeave={() => setHoverData(null)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {hoverData && (
        <div className="hover-info">
          <p>Date: {hoverData.date}</p>
          <p>Plays: {hoverData.plays}</p>
          <p>Top Song: {hoverData.plays > 0 ? hoverData.topSong : "No data"}</p>
        </div>
      )}
    </div>
  );
};

export default App;