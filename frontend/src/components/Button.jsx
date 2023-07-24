export const Button = ({ text, variant, onClickHandler, extraStyles = "" }) => {
  const baseClasses =
    "rounded-lg border-2 px-3 py-[4px] text-sm hover:shadow-md";

  const variantName = {
    primary: "bg-[#B59D9A] border-[#B59D9A]",
    secondary: "bg-black border-black text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantName[variant]} ${extraStyles}`}
      type="submit"
      onClick={onClickHandler || null}
    >
      {text}
    </button>
  );
};
