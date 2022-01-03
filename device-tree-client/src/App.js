import { Layout } from "antd";
import { DeviceTreePage } from "./pages/DeviceTreePage";
import "antd/dist/antd.min.css";

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header
          style={{
            color: "#fff",
            fontSize: "25px",
            padding: "0 20px",
            background: "#1890ff",
          }}
        >
          Device Tree
        </Header>
        <Content style={{ background: "#fff" }}>
          <DeviceTreePage />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
