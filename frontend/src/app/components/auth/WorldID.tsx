"use client";
import React from "react";
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';

const WorldID = () => {
  const handleVerify = async (proof: ISuccessResult) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });

    if (!response.ok) {
      console.error("Verification failed");
      throw new Error("Verification failed");
    }

    console.log("Verification successful");
  };

  const onSuccess = () => {
    console.log("Modal closed after successful verification");
    window.location.href = "/success";
  };

  return (
    <div>
      <h1>WorldID</h1>
      <IDKitWidget
        app_id="app_staging_a24b12ac8ba10cf07012da40d04007e5" 
        action="" 
        onSuccess={onSuccess} 
        handleVerify={handleVerify} 
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
      </IDKitWidget>
    </div>
  );
};

export default WorldID;
