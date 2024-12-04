import React from "react";
import { Link, useForm } from "@inertiajs/react";

export default function Index({ comments }) {
  return (
    <div>
      <h1>Комментарии</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p><strong>{comment.user.name}:</strong> {comment.content}</p>
            <p>Связан с заказом: {comment.order_id || "Не указан"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
