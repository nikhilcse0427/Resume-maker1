import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Clock, TrendingUp, Award, Trash2, Edit, Check, Zap } from "lucide-react";

// ProfileInfoCard Component
export const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-blue-50/50 transition-colors duration-200">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-medium text-sm">
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-800">{user.name || ""}</div>
          <button
            className="text-xs text-blue-700 hover:text-blue-800 font-medium transition-colors text-left"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

// ResumeSummaryCard Component
export const ResumeSummaryCard = ({
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  onSelect,
  onDelete,
  completion = 85,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedCreatedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const getCompletionColor = () => {
    if (completion >= 90) return "from-blue-600 to-blue-700";
    if (completion >= 70) return "from-blue-500 to-blue-600";
    return "from-blue-400 to-blue-500";
  };

  const getCompletionIcon = () => {
    if (completion >= 90) return <Award size={12} className="text-blue-700" />;
    if (completion >= 70) return <TrendingUp size={12} className="text-blue-600" />;
    return <Zap size={12} className="text-blue-500" />;
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const generateDesign = () => {
    const colors = [
      "from-blue-50 to-blue-100",
      "from-blue-100 to-blue-200",
      "from-blue-50 to-blue-200",
      "from-blue-100 to-blue-50",
      "from-blue-200 to-blue-100"
    ];
    return colors[title.length % colors.length];
  };

  const designColor = generateDesign();

  return (
    <div
      className="w-full bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-blue-800 z-10">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCompletionColor()}`} />
        <span>{completion}%</span>
        {getCompletionIcon()}
      </div>

      {/* Preview area */}
      <div className={`relative h-40 ${designColor} overflow-hidden`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
            <Edit size={20} className="text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-blue-900">{title}</span>
          <span className="text-xs text-blue-700/80 mt-1">
            {completion === 0 ? "Start building" : `${completion}% completed`}
          </span>

          {/* Mini resume sections indicator */}
          <div className="mt-3 flex gap-1">
            {['Profile', 'Work', 'Skills', 'Edu'].map((section, i) => (
              <div
                key={i}
                className={`px-1.5 py-0.5 text-[10px] rounded ${i < Math.floor(completion / 25)
                  ? 'bg-white/90 text-blue-700 font-medium'
                  : 'bg-white/50 text-blue-500/70'
                  }`}
              >
                {section}
              </div>
            ))}
          </div>
        </div>

        {/* Hover overlay with action buttons */}
        {isHovered && (
          <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm flex items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect();
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-100 transition-colors"
              title="Edit"
            >
              <Edit size={16} className="text-blue-600" />
            </button>
            <button
              onClick={handleDeleteClick}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-blue-900 truncate">{title}</h5>
            <div className="flex items-center text-xs text-blue-600/80 mt-1">
              <Clock size={12} className="mr-1 text-blue-500" />
              <span>Created: {formattedCreatedDate}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getCompletionColor()} rounded-full transition-all duration-500 ease-out relative`}
            style={{ width: `${completion}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Completion status */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-blue-600/80">
            {completion < 50 ? "Getting Started" : completion < 80 ? "Almost There" : "Ready to Go!"}
          </span>
          <span className="text-xs font-medium text-blue-700">{completion}%</span>
        </div>
      </div>
    </div>
  );
};

// TemplateCard Component
export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      className={`group h-full flex flex-col bg-white border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg rounded-xl
      ${isSelected
          ? "border-blue-600 shadow-md shadow-blue-600/20 bg-blue-50/50"
          : "border-blue-200 hover:border-blue-400"
        }`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={thumbnailImg || "/placeholder.svg"}
            alt="Template Preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Selection indicator */}
          {isSelected && (
            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
              <div className="w-12 h-12 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Check size={20} className="text-blue-700" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-48 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-2 shadow-sm">
            <Edit size={18} className="text-white" />
          </div>
          <span className="text-sm font-medium text-blue-800">No Preview</span>
        </div>
      )}
      
      <div className="p-3 border-t border-blue-100">
        <div className="text-sm font-medium text-blue-900 truncate">Template</div>
        <div className="text-xs text-blue-600/80 mt-1">Click to select</div>
      </div>
    </div>
  );
};