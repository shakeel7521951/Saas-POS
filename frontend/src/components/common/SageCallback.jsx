import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader, ArrowLeft } from "lucide-react";

const SageCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (error) {
          setStatus("error");
          setMessage(errorDescription || error || "OAuth authorization failed");
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received from Sage");
          return;
        }

        // Call the backend to handle the OAuth callback
        const response = await fetch(
          `/api/sage/callback?code=${code}&state=${state}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Successfully connected to Sage! Redirecting...");

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to complete Sage authorization");
        }
      } catch (error) {
        console.error("Sage callback error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred during authorization");
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="mb-6">
            {status === "processing" && (
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}

            {status === "success" && (
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            )}

            {status === "error" && (
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {status === "processing" && "Connecting to Sage..."}
              {status === "success" && "Connection Successful!"}
              {status === "error" && "Connection Failed"}
            </h1>

            <p className="text-gray-600">
              {status === "processing" &&
                "Please wait while we complete your Sage integration."}
              {status === "success" && message}
              {status === "error" && message}
            </p>
          </div>

          {status === "error" && (
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
          )}

          {status === "processing" && (
            <div className="text-sm text-gray-500">
              This may take a few moments...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SageCallback;
