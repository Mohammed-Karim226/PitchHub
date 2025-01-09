"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { motion } from "framer-motion";

interface IUserDetails {
  name?: string;
  id?: number;
  username?: string;
  email?: string;
  image?: string;
  bio?: string;
  _id?: string;
}

const UserDetails = ({ user }: { user: IUserDetails }) => {
  const { name, username, email, image, bio } = user;

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-md w-full bg-white rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center gap-4 p-6 border-b">
          <Avatar className="w-24 h-24">
            <AvatarImage src={image} alt={`${name}'s profile`} />
            <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold text-gray-800">
            {name || "Unknown User"}
          </h1>
          <h2 className="text-sm text-gray-500">@{username || "username"}</h2>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            {bio || "This user has not provided a bio yet."}
          </p>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-800">Email:</p>
            <p className="text-sm text-gray-600">{email || "Not available"}</p>
          </div>
        </CardContent>
        <CardFooter className="p-6 flex justify-end">
          <Button variant="default">Message</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UserDetails;
