import Layout from "../../components/layout/layout.component.jsx";
import Private from "../../components/AuthComponents/private";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <h2>User Dashboard</h2>
      </Private>
    </Layout>
  );
};

export default UserIndex;
