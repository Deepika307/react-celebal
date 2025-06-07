import React from "react";

export default function SuccessPage() {
  const { state } = useLocation();

  return (
    <div>
      <h2>Form Submitted Successfully</h2>
    </div>
  );
}
