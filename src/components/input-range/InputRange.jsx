export const InputRange = ({ handleChange, max, value }) => {
  return (
    <input
      onChange={handleChange}
      type="range"
      min="0"
      max={max}
      value={value}
      step="1"
      className="w-full h-2 bg-cyan-500 rounded-lg appearance-none cursor-pointer hover:shadow-indigo-500/40 dark:bg-gray-700 self-center"
    />
  );
};
