// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState("hindi");
//   const navigate = useNavigate();

//   const handleLanguageSelect = (e) => {
//     setSelectedLanguage(e.target.value);
//   };

//  const handleStartGame = () => {
//   fetch(`http://localhost:3000/api/getQuestions?language${selectedLanguage}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       navigate('/questions', { state: { questions: data } });
//     })
//     .catch((error) => {
//       console.error("Error fetching questions:", error);
//       // Handle error (display an error message, etc.)
//     });
// };


//   return (
//     <div className="d-flex">
//       <div className="col-md-6 p-0 m-0" style={{ flex: "0 0 30%" }}>
//         <img
//           src="/lab.png"
//           className="img-fluid w-100 h-100 pl-10 ml-10"
//           alt="Lab"
//         />
//       </div>
//       <div className="col-md-6 vh-50 d-flex flex-column align-items-center justify-content-center">
//         <div className="text-center h1 agbalumo-font pb-3">
//           Let's Learn for a better future!
//         </div>
//         <div className="pb-3">
//           <label htmlFor="languageSelect" className="me-2">
//             Select Language:
//           </label>
//           <select
//             className="form-select"
//             id="languageSelect"
//             value={selectedLanguage}
//             onChange={handleLanguageSelect}
//           >
//             <option value="hindi">Hindi</option>
//             <option value="english">English</option>
//           </select>
//         </div>
//         <div>
//           <button className="btn btn-success" onClick={handleStartGame}>
//             Start Game
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLanguageSelect = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleStartGame = () => {
    navigate('/questions', { state: { selectedLanguage } });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex">
      <div className="col-md-6 p-0 m-0" style={{ flex: "0 0 30%" }}>
        <img
          src="/lab.png"
          className="img-fluid w-100 h-100 pl-10 ml-10"
          alt="Lab"
        />
      </div>
      <div className="col-md-6 vh-50 d-flex flex-column align-items-center justify-content-center">
        <div className="text-center h1 agbalumo-font pb-3">
          Let's Learn for a better future!
        </div>
        {isLoggedIn ? (
          <>
            <div className="pb-3">
              <label htmlFor="languageSelect" className="me-2">
                Select Language:
              </label>
              <select
                className="form-select"
                id="languageSelect"
                value={selectedLanguage}
                onChange={handleLanguageSelect}
              >
                <option value="hindi">hindi</option>
                <option value="english">english</option>
              </select>
            </div>
            <div>
              <button className="btn btn-success" onClick={handleStartGame}>
                Start Game
              </button>
            </div>
          </>
        ) : (
          <div>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
