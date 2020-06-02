import Layout from "../components/layout/layout.component";
import SignupComponent from "../components/AuthComponents/signup/signup.component";

const Signup = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup Page</h2>
      <div className="row">
        <div className=" col-md-6 offset-md-3">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
