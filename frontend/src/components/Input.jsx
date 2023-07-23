export const Input = ({ type, placeholder, formFunction }) => {
  const inputClass =
    "w-full p-1 rounded-lg focus:outline-none focus:border-[1px] focus:border-black";
  const fileInputClass =
    "file:cursor-pointer cursor-pointer w-full file:bg-[#b59d9aa8] file:text-sm file:p-2 file:border-0 file:rounded-lg rounded-lg bg-white";

  return (
    <input
      className={type === "file" ? fileInputClass : inputClass}
      type={type}
      placeholder={placeholder}
      accept={type === "file" ? "application/pdf" : ""}
      {...formFunction}
    />
  );
};
