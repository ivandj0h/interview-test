# Image Upload

A web application that allows users to upload images from their computer, crop them, and then upload the cropped image to the server. The image metadata is stored in a MongoDB database.

## Features

- **Image Upload**: Users can select an image from their device.
- **Image Crop**: Before uploading, users can crop the image to their preferred size.
- **Upload to Server**: After cropping, the image is uploaded to the server and its metadata is saved in MongoDB.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: MongoDB

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- MongoDB database (local or cloud)

### Backend (NestJS)

1. Clone the repository

   ```bash
   git clone https://github.com/ivandi1980/interview-test.git
   cd image-upload/backend
   ```

2. Install dependencies

```bash
   npm install
   ```

3. Start the NestJS server

```bash
   npm run start:dev

   ```

### Frontend (NextJS)

1. Navigate to the frontend directory

   ```bash
   cd ../frontend

   ```

2. Install dependencies

```bash
   npm install
   ```

3. Start the NestJS server

```bash
   npm run dev

   ```

## Screen Shoot

![crop](/frontend/public/images/crop.png)

### Author

[ivandjoh](https://linkedin.com/in/ivandjoh)
