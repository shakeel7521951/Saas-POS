import React from "react";
import { useGetSageAuthUrlQuery } from "../../store/api/sageApi";

const SageDebug = () => {
  const { data: authResponse, isLoading, error } = useGetSageAuthUrlQuery();

  console.log("SageDebug - authResponse:", authResponse);
  console.log("SageDebug - isLoading:", isLoading);
  console.log("SageDebug - error:", error);

  const handleTestRedirect = () => {
    console.log("Test redirect clicked");
    if (authResponse?.authUrl) {
      console.log("Redirecting to:", authResponse.authUrl);
      window.location.href = authResponse.authUrl;
    } else {
      console.log("No auth URL available");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid red", margin: "20px" }}>
      <h3>Sage Debug Component</h3>
      <p>Loading: {isLoading ? "Yes" : "No"}</p>
      <p>Auth URL: {authResponse?.authUrl || "Not available"}</p>
      <p>Error: {error ? JSON.stringify(error) : "None"}</p>
      <button
        onClick={handleTestRedirect}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Test Redirect to Sage
      </button>
    </div>
  );
};

export default SageDebug;
