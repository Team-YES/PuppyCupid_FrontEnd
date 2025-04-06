import PrivateRoute from "@/components/PrivateRoute";
import PostRegistrationPage from "@/features/PostRegistration";

const PostRegistration = () => {
  return (
    <PrivateRoute>
      <PostRegistrationPage />
    </PrivateRoute>
  );
};

export default PostRegistration;
