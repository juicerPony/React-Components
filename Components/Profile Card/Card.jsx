import React from "react";

const ProfileCard = ({ photo, name, description, links }) => {
  return (
    <div style={styles.card}>
      <div style={styles.topBar}>
        <span style={styles.back}>&larr;</span>
        <span style={styles.favorite}>&#9825;</span>
      </div>
      <div style={styles.photoContainer}>
        <img src={photo} alt={name} style={styles.photo} />
      </div>
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.description}>{description}</p>
      <div style={styles.links}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    position: "relative",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  back: {
    cursor: "pointer",
    fontSize: "20px",
  },
  favorite: {
    cursor: "pointer",
    fontSize: "20px",
  },
  photoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  photo: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    margin: "5px 0",
    fontSize: "18px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  links: {
    display: "flex",
    justifyContent: "space-around",
  },
  link: {
    textDecoration: "none",
    color: "#0073e6",
    fontWeight: "500",
  },
};

export default ProfileCard;
