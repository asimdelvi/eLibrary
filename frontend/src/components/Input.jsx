export const Input = ({ type, placeholder, formFunction }) => {
  const inputClass =
    "w-full p-2 m-2 text-lg border-dashed border-2 border-black rounded-lg focus:outline-none focus:border-[2px] focus:border-black focus:border-solid";
  const fileInputClass =
    "file:cursor-pointer m-2 border-dashed border-2 border-black cursor-pointer w-full file:bg-[#DCDCDC] file:text-lg file:p-2 file:border-0 file:rounded-lg rounded-lg bg-white";

  if (type === "textarea") {
    return (
      <textarea
        className={`${inputClass} m-1`}
        placeholder={placeholder}
        {...formFunction}
      ></textarea>
    );
  } else {
    return (
      <input
        className={type === "file" ? fileInputClass : inputClass}
        type={type}
        placeholder={placeholder}
        accept={type === "file" ? "application/pdf" : ""}
        {...formFunction}
      />
    );
  }
};
