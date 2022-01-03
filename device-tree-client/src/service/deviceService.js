import axios from "axios";
import { groupBy } from "lodash";

// Create WebSocket connection.
export const socket = new WebSocket(process.env.REACT_APP_WS_DEVICES_API);

// Connection opened
socket.addEventListener("open", (event) => {
  // console.log("Connected to WS Server");
});

const query = async () => {
  try {
    return await axios.get(process.env.REACT_APP_DEVICES_API);
  } catch (error) {
    console.log(`Error-deviceService-query:`, error);
  }
};

const setTree = (devices) => {
  devices.sort((a, b) => a.deviceAddress - b.deviceAddress);
  return devices.map(_makeBranch);
};

const _makeBranch = (device, idx) => {
  const { deviceName, manufacturer, productId, deviceAddress } = device;
  return {
    title: "USB Hub - " + deviceAddress,
    key: idx,
    children: [
      {
        title: deviceName,
        key: `${idx} - ${idx}`,
        children: [
          {
            title: (
              <>
                <div>Vendor: {manufacturer}</div>
                <div>Product ID: {productId}</div>
                <div>Device address: {deviceAddress}</div>
              </>
            ),
            key: `${idx} - ${idx} - ${idx}`,
          },
        ],
      },
    ],
  };
};

const setTreeByType = (devices) => {
  const devicesByType = Object.entries(groupBy(devices, "deviceName"));
  return devicesByType.map(_makeBranchByType);
};

const _makeBranchByType = ([key, value], idx) => {
  return {
    title: key,
    key: idx,
    children: value.map((device, idx2) => _makeChild(device, idx, idx2)),
  };
};

const _makeChild = (device, idx, idx2) => {
  const { productId, deviceAddress, manufacturer } = device;
  return {
    title: (
      <>
        <div>{manufacturer}</div>
        <div>Product ID: {productId}</div>
        <div>Device address: {deviceAddress}</div>
      </>
    ),
    key: `${idx} - ${idx2}`,
  };
};

export const deviceService = { query, setTree, setTreeByType, socket };
