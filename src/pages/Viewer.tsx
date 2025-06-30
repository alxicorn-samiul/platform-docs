import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Viewer = () => (
  <div>
    <SwaggerUI url="docs/auth/auth_login.yml" />
  </div>
);
export default Viewer;
