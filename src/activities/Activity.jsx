import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { deleteActivity, getActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function Activity() {
  const { token } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncActivity = async () => {
      const data = await getActivity(id);
      setActivity(data);
    };
    syncActivity();
  }, [id]);

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, activity.id);
      nav("/activities");
    } catch (error) {
      setError(error.message);
    }
  };
  if (!activity) {
    return <p>Loading...</p>;
  }
  return (
    <section>
      <h1>{activity.name}</h1>
      <p>created by {activity.creatorName}</p>
      <p>{activity.description}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p>{error}</p>}
    </section>
  );
}
