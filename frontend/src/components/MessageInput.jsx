import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-100/80 backdrop-blur-sm border-t border-base-300/50">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-fadeInUp">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border-2 border-primary/20 shadow-md group-hover:shadow-lg transition-all duration-200"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
              flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full input input-bordered rounded-xl input-sm sm:input-md input-enhanced pr-12
                         focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 
                         hover:bg-base-300/50 p-1 rounded-lg transition-colors duration-200"
            >
              <Smile className="size-4 text-base-content/60 hover:text-primary transition-colors" />
            </button>
          </div>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-circle btn-ghost transition-all duration-200 hover:scale-105
                     ${imagePreview ? "text-success bg-success/10" : "text-base-content/60 hover:bg-primary/10 hover:text-primary"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={18} />
          </button>
        </div>
        
        <button
          type="submit"
          className="btn btn-circle btn-primary btn-enhanced shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
