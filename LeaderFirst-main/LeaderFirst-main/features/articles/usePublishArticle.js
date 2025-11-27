// src/features/articles/usePublishArticle.js
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export function usePublishArticle(token) {
  const navigate = useNavigate();

  return async function publish(payload) {
    const res = await api("/api/articles", {
      method: "POST",
      token,
      body: payload,
    });

    if (res.status === 402 && res.data?.code === "PAYMENT_REQUIRED") {
      navigate("/pay");
      return { redirected: true };
    }

    if (!res.ok) {
      throw new Error(res.data?.message || "Failed to publish article");
    }

    return res.data?.data;
  };
}
