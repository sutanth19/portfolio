import React, { useState } from "react";

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  onItemClick?: (index: number) => void;
  cvUrl?: string; // Add CV URL prop
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder: React.FC<FolderProps> = ({
  color = "#5227FF",
  size = 1,
  items = [],
  className = "",
  onItemClick,
  cvUrl,
}) => {
  const maxItems = 2; // Changed from 3 to 2
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);

  const handleClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    
    if (onItemClick) {
      onItemClick(index);
    } else if (cvUrl) {
      // Default behavior - open CV
      window.open(cvUrl, '_blank');
    } else {
      // Fallback - you can customize this
      const actions = [
        () => {
          // Action for first paper (CV)
          console.log("Opening CV...");
          // You can add your CV download/view logic here
          // Example: window.open('/cv.pdf', '_blank');
        },
        () => {
          // Action for second paper (Cover Letter)
          console.log("Opening Cover Letter...");
          // You can add your cover letter logic here
          // Example: window.open('/cover-letter.pdf', '_blank');
        }
      ];
      
      if (actions[index]) {
        actions[index]();
      }
    }
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    // Properly balanced positions for 2 items
    if (index === 0) return "translate(-99%, -70%) rotate(-15deg)"; // CV - left side
    if (index === 1) return "translate(-15%, -70%) rotate(15deg)"; // CL - right side
    return "";
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? "hover:-translate-y-2" : ""
        }`}
        style={{
          ...folderStyle,
          transform: open ? "translateY(-8px)" : undefined,
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {papers.map((item, i) => {
            let sizeClasses = "";
            // Adjusted sizes for 2 items
            if (i === 0) sizeClasses = open ? "w-[70%] h-[80%]" : "w-[70%] h-[80%]";
            if (i === 1) sizeClasses = open ? "w-[80%] h-[80%]" : "w-[80%] h-[70%]";

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onClick={(e) => open && handlePaperClick(e, i)}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !open
                    ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
                    : "hover:scale-110 cursor-pointer"
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : paper2,
                  borderRadius: "10px",
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;