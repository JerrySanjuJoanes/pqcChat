import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Sparkles } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-base-300/50 p-8 space-y-8 animate-fadeInUp">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-4xl font-bold gradient-text">Profile</h1>
              <Sparkles className="w-6 h-6 text-primary animate-pulse-slow" />
            </div>
            <p className="text-lg text-base-content/70">Your personal information and account details</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-40 rounded-full object-cover border-4 border-primary/20 shadow-xl group-hover:shadow-2xl transition-all duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2 
                  bg-primary hover:bg-primary/80 text-primary-content
                  p-3 rounded-full cursor-pointer shadow-lg
                  transition-all duration-200 hover:scale-110
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="text-center">
              <p className="text-base text-base-content/60">
                {isUpdatingProfile
                  ? "Uploading your new photo..."
                  : "Click the camera icon to update your profile picture"}
              </p>
              {isUpdatingProfile && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-primary">Processing...</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1.5 animate-fadeInLeft" style={{animationDelay: '0.1s'}}>
              <div className="text-sm font-semibold text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </div>
              <div className="px-4 py-3 bg-base-200/50 rounded-xl border border-base-300/50 hover:bg-base-200 transition-colors duration-200">
                <p className="text-base font-medium">{authUser?.fullName}</p>
              </div>
            </div>

            <div className="space-y-1.5 animate-fadeInRight" style={{animationDelay: '0.2s'}}>
              <div className="text-sm font-semibold text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </div>
              <div className="px-4 py-3 bg-base-200/50 rounded-xl border border-base-300/50 hover:bg-base-200 transition-colors duration-200">
                <p className="text-base font-medium">{authUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-base-200/50 to-base-300/50 rounded-2xl p-6 border border-base-300/50 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Account Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-base-100/50 rounded-xl border border-base-300/30">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-medium">Member Since</span>
                </div>
                <span className="text-sm font-semibold text-base-content/70">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-base-100/50 rounded-xl border border-base-300/30">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="font-medium">Account Status</span>
                </div>
                <span className="flex items-center gap-2 text-sm font-semibold text-success">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
