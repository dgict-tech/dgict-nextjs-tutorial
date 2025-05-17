"use client";

import React from "react";
import { useParams } from "next/navigation";

function TodoDetails() {
  const { id } = useParams();

  return <div>This is a todo with ID of {id}</div>;
}

export default TodoDetails;
