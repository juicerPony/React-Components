import React from "react";
import ProfileCard from "./ProfileCard";

const App = () => {
  const links = [
    { label: "Twitter", url: "https://twitter.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "GitHub", url: "https://github.com" },
  ];

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <ProfileCard
        photo="https://via.placeholder.com/100"
        name="John Doe"
        description="Frontend Developer | React Enthusiast"
        links={links}
      />
    </div>
  );
};

export default App;
