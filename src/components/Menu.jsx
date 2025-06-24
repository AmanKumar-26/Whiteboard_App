'use client'
import { BiMenuAltRight } from "react-icons/bi";
import { MdClose, MdDeleteOutline } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const Menu = ({ clearCanvas, setStrokeWidth, strokeWidth, canvasColor, setCanvasColor, setElements, elements, updateCanvas }) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const saveFile = () => {
        const data = JSON.stringify(elements);
        const blob = new Blob([data], { type: 'application/ink' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'drawing.ink';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const loadFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.ink';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file && file.name.endsWith('.ink')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = JSON.parse(event.target.result);
                    setElements(data);
                    updateCanvas(data);
                    toast('File Loaded Successfully', {
                        icon: '📁',
                        style: { borderRadius: '10px', background: '#333', color: '#fff' },
                    });
                };
                reader.readAsText(file);
            } else {
                alert('Please select a valid .ink file.');
            }
        };
        input.click();
    };

    useEffect(() => {
        clearCanvas();
    }, [canvasColor]);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setShowSidebar(true)}
                className="fixed top-4 right-4 z-50 bg-secondary p-2 rounded-full text-white hover:bg-primary"
            >
                <BiMenuAltRight size={28} />
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-secondary text-[#c6cbdc] z-40 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={() => setShowSidebar(false)} className="text-white hover:text-red-400">
                        <MdClose size={24} />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <button onClick={clearCanvas} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-slate-600 active:bg-tertiary">
                        <MdDeleteOutline size={20} className="text-pink-900" /> Clear Canvas
                    </button>

                    <button onClick={saveFile} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-slate-600 active:bg-tertiary">
                        <FaSave size={16} className="text-gray-300" /> Save File
                    </button>

                    <button onClick={loadFile} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-slate-600 active:bg-tertiary">
                        <AiFillFolderOpen size={18} className="text-gray-300" /> Open File
                    </button>

                    <div className="mt-4">
                        <label className="block text-sm mb-1">Stroke Width: {strokeWidth}</label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={strokeWidth}
                            onChange={(e) => setStrokeWidth(e.target.value)}
                            className="w-full cursor-pointer"
                        />
                    </div>

                    <div className="mt-4">
                        <p className="text-sm mb-2">Change Canvas Color</p>
                        <div className="flex gap-2">
                            {["#ffffff", "#000000", "#1f3d36", "#121212"].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setCanvasColor(color)}
                                    className={`w-8 h-8 rounded-lg`}
                                    style={{
                                        backgroundColor: color,
                                        border: canvasColor === color ? '2px solid #00f0ff' : 'none'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-30"
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </>
    );
};

export default Menu;
