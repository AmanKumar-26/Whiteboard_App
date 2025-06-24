// tools.js or wherever your tools config is
import { BsPencil } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { MdOutlineRectangle } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { BiEraser } from "react-icons/bi";
import { MdTextFields } from "react-icons/md"; // ✅ NEW: Import Text icon

export const tools = [
  {
    title: "Pencil",
    icon: <BsPencil />,
    value: "pencil",
  },
  {
    title: "Line",
    icon: <AiOutlineLine />,
    value: "line",
  },
  {
    title: "Rectangle",
    icon: <MdOutlineRectangle />,
    value: "rect",
  },
  {
    title: "Circle",
    icon: <BsCircle />,
    value: "circle",
  },
  {
    title: "Eraser",
    icon: <BiEraser />,
    value: "eraser",
  },
  {
    title: "Text", // ✅ NEW: Text tool
    icon: <MdTextFields />,
    value: "text",
  },
];
