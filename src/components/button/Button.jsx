export const Button = ({ handleClick, text }) => {
  return (
    <button
      className="bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:shadow-indigo-500/40 text-white p-2 h-10"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
