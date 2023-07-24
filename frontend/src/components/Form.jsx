export const Form = ({ title, formSubmitFunction, children }) => {
  return (
    <form
      onSubmit={formSubmitFunction}
      className="flex p-2 h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
    >
      <h2 className="text-lg font-bold">{title}</h2>

      {children}
    </form>
  );
};
