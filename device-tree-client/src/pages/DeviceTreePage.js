import { useEffect, useState } from "react";
import { Tree, Tabs } from "antd";
import { deviceService } from "../service/deviceService";

const { TabPane } = Tabs;

export function DeviceTreePage() {
  useEffect(() => {
    getDevices();
    // Get devices by receiving message via socket
    deviceService.socket.addEventListener("message", () => getDevices());
    // Server update every 1 sec
    // const interval = setInterval(() => {
    //   getDevices();
    // }, 1 * 1000);
    // return () => clearInterval(interval);
  }, []);

  const [treeData, setTreeData] = useState([]);
  const [treeDataByType, setTreeDataByType] = useState([]);
  const [serverDown, setServerDown] = useState(false);

  const getDevices = async () => {
    try {
      const devicesData = (await deviceService.query()).data;
      setTreeData(deviceService.setTree(devicesData));
      setTreeDataByType(deviceService.setTreeByType(devicesData));
      setServerDown(false);
    } catch (error) {
      setTreeData([]);
      setServerDown(true);
      console.log(`Error-DeviceTreePage-getDevices:`, error);
    }
  };

  return (
    <div className="device-tree-page">
      {serverDown && (
        <div style={{ fontSize: "30px", padding: "10px 20px" }}>No Server</div>
      )}
      {!serverDown && (
        <Tabs defaultActiveKey="1" style={{ padding: "0px 20px" }}>
          <TabPane tab="By USB Hubs" key="1">
            <Tree showLine={{ showLeafIcon: false }} treeData={treeData} />
          </TabPane>
          <TabPane tab="By Type" key="2">
            <Tree
              showLine={{ showLeafIcon: false }}
              treeData={treeDataByType}
            />
          </TabPane>
        </Tabs>
      )}
    </div>
  );
}

export default DeviceTreePage;
