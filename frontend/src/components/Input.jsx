export const Input = ({ type, placeholder, formFunction, errors }) => {
  const inputBaseClass =
    "w-full p-2 m-2 text-lg border-2 border-black rounded-lg focus:outline-none focus:border-[2px] focus:border-solid";
  const fileInputBaseClass =
    "file:cursor-pointer m-2 border-2 border-black cursor-pointer w-full file:bg-[#dddddd] file:text-lg file:p-2 file:border-0 file:rounded-l-lg rounded-lg bg-white";

  const inputClass = "border-dashed focus:border-black";
  const inputErrorClass =
    "border-solid border-[#cc0000] focus:border-[#cc0000]";

  let cssClassName;

  if (type === "file") {
    if (errors) {
      cssClassName = `${fileInputBaseClass} ${inputErrorClass}`;
    } else {
      cssClassName = `${fileInputBaseClass} ${inputClass}`;
    }
  } else {
    if (errors) {
      cssClassName = `${inputBaseClass} ${inputErrorClass}`;
    } else {
      cssClassName = `${inputBaseClass} ${inputClass}`;
    }
  }

  if (type === "textarea") {
    return (
      <textarea
        className={`${inputBaseClass} ${inputClass} m-1`}
        placeholder={placeholder}
        {...formFunction}
      ></textarea>
    );
  } else {
    return (
      <input
        className={cssClassName}
        type={type}
        placeholder={placeholder}
        accept={type === "file" ? "application/pdf" : ""}
        {...formFunction}
      />
    );
  }
};
