import { motion, AnimatePresence } from "framer-motion";

export default function FormInput(props) {
  return (
    <div className="relative z-0 flex flex-col">
      <AnimatePresence>
        {props.value && (
          <motion.label
            initial={{ top: "-9px" }}
            animate={{ top: "-12px" }}
            exit={{ top: "-9px" }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeInOut",
            }}
            className={`absolute left-2 rounded bg-white px-1 text-sm 
               text-gray-500`}
          >
            {props.required ? props.placeHolder + "*" : props.placeHolder}
          </motion.label>
        )}
      </AnimatePresence>
      <input
        name={props.name}
        type={props.type || "text"}
        onChange={props.onChange}
        value={props.value}
        placeholder={
          props.required ? props.placeHolder + "*" : props.placeHolder
        }
        className={`${
          props.touched && props.error && "border-red-500 ring-red-500"
        } w-full rounded-md border px-4 py-2 focus:border-[#5F58FF] focus:ring-[#5F58FF] focus:outline-[#5F58FF]`}
      />
      {props.touched && props.error && (
        <span className="mt-1 text-xs text-red-500">{props.error}</span>
      )}
    </div>
  );
}
