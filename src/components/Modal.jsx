import { MdOutlineClose } from "react-icons/md";
export default function Modal({open, onClose, children}){
    return(
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center z-20 transition-colors ${open ? "visible bg-black/50" : "invisible"}`}>
            
            <div onClick={(e) => e.stopPropagation()} className={`transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                {children}
                <button onClick={onClose} className="absolute top-2 right-10 text-3xl hover:text-zinc-400 transition-all">
                    <MdOutlineClose />
                </button>
            </div>
        </div>
    )
}