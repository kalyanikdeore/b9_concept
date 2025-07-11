import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import QuestionnaireResponseForm from "./QuestionnaireReponseForm";
import { useParams } from "react-router-dom";

const QuestionnairePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <QuestionnaireResponseForm appointmentId={appointmentId} />
    </div>
  );
};

export default QuestionnairePage;
