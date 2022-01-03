# Device Tree

## Description

Client + Server solution that presents a live (with updates of connected and disconnected devices) tree of the devices connected via USB to the server's machine.
First tab defined in such a way that a USB hub is a branch, and a device is a leaf.
Second Tab grouping the devices by type.

## Technology Wise

Technologies used in this project:

- React.js
- React Hooks ( useState, useEffect)
- Axios (Rest API)
- Ant Design (React UI library)
- Node.js
- Express.js
- usb-detections
- ws (sockets)

## Getting Started

These instructions will get you a copy of the project and running on your local machine for development and testing purposes.

- run `git clone https://github.com/IlyaKad/device-tree-exercise.git`

  or

- download zip folder

  - open Command Prompt
    - `cd device-tree-server`
    - `npm run initServer`
  - open new Command Prompt
    - `cd device-tree-client`
    - `npm run initClient`

## App screenshots

![By USB Hubs](device-tree-client/img/About-screenshots/By-USB-hub.JPG "By USB Hubs")
![By Type](device-tree-client/img/About-screenshots/By-type.JPG "By Type")
