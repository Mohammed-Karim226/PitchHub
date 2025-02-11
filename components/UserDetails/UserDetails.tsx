"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { motion } from "framer-motion";
import { Mail, UserCircle, Info, Send, Pencil, Trash, ShieldCheck, Calendar, Globe, MessageCircle, Lock } from "lucide-react";

interface IUserDetails {
  name?: string;
  id?: number;
  username?: string;
  email?: string;
  image?: string;
  bio?: string;
  _id?: string;
  role?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const UserDetails = ({ user }: { user: IUserDetails }) => {
  const { name, username, email, image, bio, role, socialLinks } = user;

  return (
    <motion.div
      className="flex justify-center items-center overflow-hidden bg-gradient-to-r from-blue-50 via-slate-50 to-blue-100 min-h-screen p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="max-w-lg w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <CardHeader className="flex flex-col items-center gap-4 p-6 border-b bg-gradient-to-b from-blue-100 via-slate-50 to-white">
            <Avatar className="w-28 h-28 shadow-md ring-4 ring-blue-200">
              <AvatarImage src={image} alt={`${name}'s profile`} />
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                {name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-blue-500" />
              {name || "Unknown User"}
            </h1>
            <h2 className="text-sm text-gray-500">@{username || "username"}</h2>
          </CardHeader>
        </motion.div>

        {/* Profile Details */}
        <CardContent className="p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
            {/* Bio */}
            <div className="mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600">{bio || "This user has not provided a bio yet."}</p>
            </div>

            {/* Email */}
            <div className="mt-4 flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Email:</p>
                <p className="text-sm text-gray-600">{email || "Not available"}</p>
              </div>
            </div>

            {/* Role */}
            <div className="mt-4 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Role:</p>
                <p className="text-sm text-gray-600">{role || "Member"}</p>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-800">Social Links:</p>
                <div className="flex gap-3 mt-2">
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" className="text-blue-500 hover:underline">
                      Twitter
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" className="text-blue-500 hover:underline">
                      LinkedIn
                    </a>
                  )}
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" className="text-blue-500 hover:underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>

        {/* Footer Actions */}
        {/* <CardFooter className="flex justify-between items-center p-4 border-t bg-gray-100">
          <Button variant="outline" className="flex items-center gap-2 text-gray-700">
            <Pencil className="w-5 h-5" /> Edit
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash className="w-5 h-5" /> Delete
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Lock className="w-5 h-5" /> Block
          </Button>
        </CardFooter> */}
      </Card>
    </motion.div>
  );
};

export default UserDetails;
