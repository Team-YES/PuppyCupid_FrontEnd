import PrivateRoute from "@/components/PrivateRoute";
import PostRegistrationPage from "@/features/PostRegistration";
import BlacklistRoute from "@/components/BlacklistRoute";

const PostRegistration = () => {
  return (
    <BlacklistRoute>
      <PrivateRoute>
        <PostRegistrationPage />
      </PrivateRoute>
    </BlacklistRoute>
  );
};

export default PostRegistration;
