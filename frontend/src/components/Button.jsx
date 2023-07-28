export const Button = ({ text, variant, onClickHandler, extraStyles = "" }) => {
  const baseClasses =
    "mt-2 rounded-full font-semibold border-black text-lg border-2 px-8 py-2 anim_button";

  const variantName = {
    primary: " bg-black text-white",
    secondary: "border-dashed",
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
