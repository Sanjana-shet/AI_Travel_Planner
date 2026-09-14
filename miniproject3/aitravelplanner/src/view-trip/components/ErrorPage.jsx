// ErrorPage.jsx
import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
      <p className="mt-4">{error.statusText || error.message || "Unknown Error"}</p>
    </div>
  );
}
